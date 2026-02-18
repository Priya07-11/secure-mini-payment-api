const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    merchant_id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "SUCCESS"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
