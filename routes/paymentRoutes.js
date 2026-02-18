const express = require("express");
const Transaction = require("../models/Transaction");
const authenticate = require("../middleware/authMiddleware");
const { validatePayment } = require("../middleware/validateInput");
const logger = require("../utils/logger");

const router = express.Router();

router.post("/payment", authenticate, validatePayment, async (req, res) => {
  const { amount, currency, merchant_id } = req.body;

  const duplicate = await Transaction.findOne({
    user_id: req.user.user_id,
    amount,
    merchant_id,
    createdAt: { $gt: new Date(Date.now() - 60000) }
  });

  if (duplicate) {
    logger("Duplicate payment attempt detected");
    return res.status(409).json({ message: "Duplicate payment detected" });
  }

  const transaction = await Transaction.create({
    user_id: req.user.user_id,
    amount,
    currency,
    merchant_id
  });

  res.status(201).json({
    message: "Payment successful",
    transaction
  });
});

module.exports = router;
