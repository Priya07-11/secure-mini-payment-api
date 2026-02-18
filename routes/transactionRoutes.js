const express = require("express");
const Transaction = require("../models/Transaction");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/transactions", authenticate, async (req, res) => {
  const transactions = await Transaction.find({
    user_id: req.user.user_id
  });

  res.json(transactions);
});

module.exports = router;
