 var Transactions = require("../models/Transactions");

module.exports = function(app) {
  app.get("/api/Transactions", function(req, res) {
    Transactions.find({}).then(function(data) {
      res.send(data);
    });
  });

  app.post("/api/Transactions", (req, res) => {
    Transactions.create(req.body)
      .then(db => {
        res.json(db);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.delete("/api/Transactions", function(req, res) {
    Transactions.deleteMany().then(
    );
  });

};