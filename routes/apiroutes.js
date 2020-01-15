var Transactions = require("../models/transactions");

module.exports = function (app) {
  app.get("/api/transactions", function (req, res) {
    Transactions.find({}).then(function (data) {
      console.log(data);
      res.send(data);
    });
  });

  app.post("/api/transactions", (req, res) => {
    console.log(req.body);
    Transactions.create(req.body)
      .then(db => {
        res.json(db);
      })
      .catch(err => {
        res.json(err);
      });
  });
};