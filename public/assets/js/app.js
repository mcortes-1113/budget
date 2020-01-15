// const calculations = require("./calculations");
// import calculations from "./calculations"
// import { subtract, add } from "./calculations";
// const transactions = require("../models/transactions");
const amountEl = document.getElementById("amount");
const balanceEl = document.getElementById("balance");
const itemEl = document.getElementById("item");
const expensesListEl = document.getElementById("expenses-list");
const expenseBtn = document.getElementById("expenseBtn");
const depositBtn = document.getElementById("depositBtn");
const resetBtn = document.getElementById("resetBtn");
// let bal = "";

//=====This line needs to be added to package.json scripts for deployment "heroku-postbuild": "webpack -p"

function subtract(a, b) {
  return a - b;
}

function addition(a, b) {
  return a + b;
}

function addExpenseToList(type, name, price) {
  expensesListEl.innerHTML = `<li class="list-group-item">${type} Description: ${name}
    <span class="ml-4">Amount: $ - ${price}</span></li>` + expensesListEl.innerHTML;
}

function addDepositToList(type, name, price) {
  expensesListEl.innerHTML = `<li class="list-group-item">${type} Description: ${name}
    <span class="ml-4">Amount: $ ${price}</span></li>` + expensesListEl.innerHTML;
}

function showTransactions(type, name, price) {
  expensesListEl.innerHTML = `<li class="list-group-item">Transaction Description: ${name}
    <span class="ml-4">Amount: $ ${price}</span></li>` + expensesListEl.innerHTML;
}

function getAllTransactions() {
  // balanceEl.innerText = bal;
  $.ajax({ url: "api/transactions" })
    .done(function(response) {
      response.forEach(item => showTransactions(item.transactionType, item.item, item.amount));
    });
}

function expense(e) {
  e.preventDefault();
  const currentBal = Number(balanceEl.innerText);
  const entryAmt = Number(amountEl.value);
  const balanceAfterExpense = subtract(currentBal, entryAmt);
  // bal = balanceAfterExpense;
  const item = itemEl.value
  const type = "Expense";

  balanceEl.innerText = balanceAfterExpense;
  addExpenseToList(type, item, entryAmt);
  data = { transactionType: type, item: item, amount: entryAmt, newBalance: balanceAfterExpense };
  $.ajax({ url: "api/transactions", type: "POST", data })
    .done(function (response) {
      console.log(response);
    })
    .fail(function (err) {
      if (navigator.onLine) {
        console.log(err);
      } else {
        const request = window.indexedDB.open("entries", 1);

        var db;

        // Create schema
        request.onupgradeneeded = event => {
          db = event.target.result;

          // Creates an object store with a listID keypath that can be used to query on.
          const entriesStore = db.createObjectStore("entries", { keyPath: "budgetID" });
          // Creates a statusIndex that we can query on.
          entriesStore.createIndex("itemIndex", "itemID");
        }

        // Opens a transaction, accesses the entriesList objectStore and statusIndex.
        request.onsuccess = () => {
          db = request.result;
          const transaction = db.transaction(["entries"], "readwrite");
          const entriesStore = transaction.objectStore("entries");
          const itemIndex = entriesStore.index("itemIndex");

          // Adds data to our objectStore
          entriesStore.add(Object.assign({}, data, { budgetID: Date.parse(new Date()).toString()}));

          // Return an item by keyPath
          // const getRequest = entriesStore.get("1");
          const getRequest = entriesStore.get(budgetID);
          getRequest.onsuccess = () => {
            console.log(getRequest.result);
          };

          // Return an item by index
          const getRequestIdx = itemIndex.getAll("complete");
          getRequestIdx.onsuccess = () => {
            console.log(getRequestIdx.result);
          };
        };
      }
    })
};

function deposit(d) {
  d.preventDefault();
  const currentBal = Number(balanceEl.innerText);
  const entryAmt = Number(amountEl.value);
  const balanceAfterDeposit = addition(currentBal, entryAmt);
  // bal = balanceAfterDeposit;
  const item = itemEl.value
  const type = "Deposit";

  balanceEl.innerText = balanceAfterDeposit;
  addDepositToList(type, item, entryAmt);
  data = { transactionType: type, item: item, amount: entryAmt, newBalance: balanceAfterDeposit };
  $.ajax({ url: "api/transactions", type: "POST", data })
    .done(function (response) {
      console.log(response);
    })
    .fail(function (err) {
      if (navigator.onLine) {
      console.log(err)
    } else {
      const request = window.indexedDB.open("entries", 1);

      var db;

      // Create schema
      request.onupgradeneeded = event => {
        db = event.target.result;

        // Creates an object store with a listID keypath that can be used to query on.
        const entriesStore = db.createObjectStore("entries", { keyPath: "budgetID" });
        // Creates a statusIndex that we can query on.
        entriesStore.createIndex("itemIndex", "itemID");
      }

      // Opens a transaction, accesses the entriesList objectStore and statusIndex.
      request.onsuccess = () => {
        db = request.result;
        const transaction = db.transaction(["entries"], "readwrite");
        const entriesStore = transaction.objectStore("entries");
        const itemIndex = entriesStore.index("itemIndex");

        // Adds data to our objectStore
        entriesStore.add(Object.assign({}, data, { budgetID: Date.parse(new Date()).toString()}));

        // Return an item by keyPath
        // const getRequest = entriesStore.get("1");
        const getRequest = entriesStore.get(budgetID);
        getRequest.onsuccess = () => {
          console.log(getRequest.result);
        };

        // Return an item by index
        const getRequestIdx = itemIndex.getAll("complete");
        getRequestIdx.onsuccess = () => {
          console.log(getRequestIdx.result);
        };
      };
    }
  })
};

function reset(e) {
  e.preventDefault();
  const total = 2000;
  balanceEl.innerText = total;
  expensesListEl.innerHTML = "";
}

expenseBtn.onclick = expense;
depositBtn.onclick = deposit;
resetBtn.onclick = reset;

getAllTransactions();