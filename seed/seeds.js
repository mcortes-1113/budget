let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect((process.env.MONGODB_URI || "mongodb://localhost/budget"), {
  useNewUrlParser: true,
  useFindAndModify: false
});

const budgetEntry = [
    {
      transactionType: "Expense",
      item: "testExpense",
      amount: -200,
    },
    {
      transactionType: "Deposit",
      item: "testDeposit",
      amount: 200,
    }
];

db.Transactions.deleteMany({})
.then(() => db.Transactions.collection.insertMany(budgetEntry))
.then(data => {
  console.log(data.result.n + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});