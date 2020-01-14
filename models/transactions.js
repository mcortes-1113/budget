const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionsSchema = new Schema(
  {
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    newBalance: {type: Number, required: true},
    date: { type: Date, default: Date.now },
  }
);

var Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;
