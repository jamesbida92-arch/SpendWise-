
"use strict";

// 1. Application data
let budget = 0;

const expenses = [];

// 2. Select HTML elements using the DOM
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseDateInput = document.getElementById("expense-date");

const totalBudgetElement = document.getElementById("total-budget");
const totalExpensesElement = document.getElementById("total-expenses");
const remainingBalanceElement = document.getElementById("remaining-balance");
const budgetStatusElement = document.getElementById("budget-status");
const expenseListElement = document.getElementById("expense-list");
const categorySummaryElement = document.getElementById("category-summary");
const formMessageElement = document.getElementById("form-message");

// Display money in Kenyan shillings
function formatMoney(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// 3. Calculate total expenses using a loop
function calculateTotalExpenses() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// 4. Calculate the remaining budget
function calculateRemainingBalance() {
    return budget - calculateTotalExpenses();
}

// 5. Make decisions using conditional statements
function updateBudgetStatus(total, remaining) {
    budgetStatusElement.className = "status";

    if (budget <= 0) {
        budgetStatusElement.textContent =
            "Set your monthly budget to get started.";
    } else if (total > budget) {
        budgetStatusElement.textContent =
            "Budget exceeded by " + formatMoney(Math.abs(remaining)) +
            ". Review your spending.";
        budgetStatusElement.classList.add("over-budget");
    } else if (remaining === 0) {
        budgetStatusElement.textContent =
            "You have used your entire monthly budget.";
        budgetStatusElement.classList.add("warning");
    } else if (total / budget >= 0.8) {
        budgetStatusElement.textContent =
            "Warning: You have used at least 80% of your budget. " +
            formatMoney(remaining) + " remains.";
        budgetStatusElement.classList.add("warning");
    } else {
        budgetStatusElement.textContent =
            "Your budget is healthy. You have " +
            formatMoney(remaining) + " remaining.";
        budgetStatusElement.classList.add("healthy");
    }
}

// 6. Display all expense records using a loop
function renderExpenses() {
    expenseListElement.replaceChildren();

    if (expenses.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.textContent = "No expenses recorded yet.";
        row.appendChild(cell);
        expenseListElement.appendChild(row);
        return;
    }

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = expense.name;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatMoney(expense.amount);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.dataset.id = expense.id;
        deleteButton.setAttribute(
            "aria-label",
            "Delete expense " + expense.name
        );

        actionCell.appendChild(deleteButton);

        row.append(
            nameCell,
            amountCell,
            categoryCell,
            dateCell,
            actionCell
        );

        expenseListElement.appendChild(row);
    }
}

// 7. Calculate and display spending by category
function renderCategorySummary() {
    categorySummaryElement.replaceChildren();

    if (expenses.length === 0) {
        categorySummaryElement.textContent =
            "No category spending to display yet.";
        return;
    }

    const categoryTotals = {};

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        if (categoryTotals[expense.category] === undefined) {
            categoryTotals[expense.category] = 0;
        }

        categoryTotals[expense.category] += expense.amount;
    }

    for (const category in categoryTotals) {
        const item = document.createElement("div");
        item.className = "category-item";

        const name = document.createElement("span");
        name.textContent = category;

        const amount = document.createElement("strong");
        amount.textContent = formatMoney(categoryTotals[category]);

        item.append(name, amount);
        categorySummaryElement.appendChild(item);
    }
}

// 8. Refresh all dashboard information
function updateDashboard() {
    const total = calculateTotalExpenses();
    const remaining = calculateRemainingBalance();

    totalBudgetElement.textContent = formatMoney(budget);
    totalExpensesElement.textContent = formatMoney(total);
    remainingBalanceElement.textContent = formatMoney(remaining);

    renderExpenses();
    renderCategorySummary();
    updateBudgetStatus(total, remaining);
}

// 9. Handle setting the monthly budget
budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredBudget = Number(budgetInput.value);

    if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {
        budgetStatusElement.textContent =
            "Please enter a budget greater than zero.";
        budgetStatusElement.className = "status warning";
        return;
    }

    budget = enteredBudget;
    updateDashboard();

    formMessageElement.textContent = "";
    budgetForm.reset();
});

// 10. Handle adding expenses
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = Number(expenseAmountInput.value);
    const category = expenseCategoryInput.value;
    const date = expenseDateInput.value;

    if (name === "" || !category || !date) {
        formMessageElement.textContent =
            "Please complete all expense fields.";
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        formMessageElement.textContent =
            "Please enter an expense amount greater than zero.";
        return;
    }

    // Store each expense as an object inside the array
    const expense = {
        id: Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    updateDashboard();

    formMessageElement.textContent = "Expense added successfully.";
    expenseForm.reset();
    expenseDateInput.value = new Date().toLocaleDateString("en-CA");
});

// 11. Handle deleting expenses using an event listener
expenseListElement.addEventListener("click", function (event) {
    const button = event.target.closest("button.delete-button");

    if (!button) {
        return;
    }

    const expenseIndex = expenses.findIndex(function (expense) {
        return expense.id === button.dataset.id;
    });

    if (expenseIndex !== -1) {
        expenses.splice(expenseIndex, 1);
        updateDashboard();
        formMessageElement.textContent = "Expense deleted successfully.";
    }
});

// 12. Set today's date and display the initial dashboard
expenseDateInput.value = new Date().toLocaleDateString("en-CA");
updateDashboard();