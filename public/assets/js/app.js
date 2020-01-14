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

//=====This line needs to be added to package.json scripts for deployment "heroku-postbuild": "webpack -p"

function subtract(a, b) {
  return a - b;
}

function addition(a, b) {
return a + b;
}

function addExpenseToList(name, price) {
  expensesListEl.innerHTML += `<li class="list-group-item">Expense Description: ${name}
    <span class="ml-4">Amount: $ ${price}</span></li>`;
}

function addDepositToList(name, price) {
  expensesListEl.innerHTML += `<li class="list-group-item">Deposit Description: ${name}
    <span class="ml-4">Amount: $ ${price}</span></li>`;
}

function expense(e) {
  e.preventDefault();
  const currentBal = Number(balanceEl.innerText);
  const entryAmt = Number(amountEl.value);
  const balanceAfterExpense = subtract(currentBal, entryAmt );
  const item =itemEl.value

    balanceEl.innerText = balanceAfterExpense;
    addExpenseToList(item, entryAmt);
    data = {item: item, amount: entryAmt, newBalance: balanceAfterExpense};
    $.ajax({url: "api/Transactions", type: "POST", data})
      .done(function(response) {
        console.log(response);
      })
        .fail(function (err) {
          console.log(err)
        })
  };

function deposit(d) {
  d.preventDefault();
  const currentBal = Number(balanceEl.innerText);
  const entryAmt = Number(amountEl.value);
  const balanceAfterDeposit = addition(currentBal, entryAmt);
  const item =itemEl.value
    
    balanceEl.innerText = balanceAfterDeposit;
    addDepositToList(item, entryAmt);
    data = {item: item, amount: entryAmt, newBalance: balanceAfterDeposit};
    $.ajax({url: "api/Transactions", type: "POST", data})
      .done(function(response) {
        console.log(response);
      })
        .fail(function (err) {
          console.log(err)
        })
}

function reset(e) {
  e.preventDefault();
  const total = 2000;
  balanceEl.innerText = total;
  expensesListEl.innerHTML = "";
}

expenseBtn.onclick = expense;
depositBtn.onclick = deposit;
resetBtn.onclick = reset;
