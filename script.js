
"use strict";

// ======================================
// 1. APPLICATION DATA (VARIABLES)
// ======================================

let budget = Number(localStorage.getItem("spendwise-budget")) || 0;

let expenses = JSON.parse(localStorage.getItem("spendwise-expenses")) || [];

// Data types: Number, String, Array and Object

// ======================================
// 2. SELECT HTML ELEMENTS
// ======================================

const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const promptBudgetButton = document.getElementById("prompt-budget-button");

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

// ======================================
// 3. FORMAT MONEY
// ======================================

function formatMoney(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ======================================
// 4. CALCULATE TOTAL EXPENSES
// ======================================

function calculateTotalExpenses() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// ======================================
// 5. CALCULATE REMAINING BALANCE
// ======================================

function calculateRemainingBalance() {
    return budget - calculateTotalExpenses();
}

// ======================================
// 6. DISPLAY RESULTS IN CONSOLE
// ======================================

function displayBudgetReport() {
    const totalExpenses = calculateTotalExpenses();
    const remainingBalance = calculateRemainingBalance();

    console.log("===== SPENDWISE BUDGET REPORT =====");
    console.log("Monthly Budget: " + formatMoney(budget));
    console.log("Total Expenses: " + formatMoney(totalExpenses));
    console.log("Remaining Balance: " + formatMoney(remainingBalance));
    console.log("===================================");
}

// ======================================
// 7. SAVE DATA IN LOCAL STORAGE
// ======================================

function saveExpenses() {
    localStorage.setItem("spendwise-expenses", JSON.stringify(expenses));
}

// ======================================
// 8. DISPLAY BUDGET STATUS
// ======================================

function updateBudgetStatus(total, remaining) {
    budgetStatusElement.className = "status";

    if (budget <= 0) {
        budgetStatusElement.textContent =
            "Set your monthly budget to get started.";

    } else if (total > budget) {
        budgetStatusElement.textContent =
            "Budget exceeded by " + formatMoney(Math.abs(remaining));

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

// ======================================
// 9. DISPLAY EXPENSE RECORDS
// ======================================

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

// ======================================
// 10. DISPLAY CATEGORY SUMMARY
// ======================================

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

// ======================================
// 11. UPDATE DASHBOARD
// ======================================

function updateDashboard() {
    const total = calculateTotalExpenses();
    const remaining = calculateRemainingBalance();

    totalBudgetElement.textContent = formatMoney(budget);
    totalExpensesElement.textContent = formatMoney(total);
    remainingBalanceElement.textContent = formatMoney(remaining);

    renderExpenses();
    renderCategorySummary();
    updateBudgetStatus(total, remaining);

    // Display calculations in the browser console
    displayBudgetReport();
}

// ======================================
// 12. COLLECT BUDGET USING PROMPT
// ======================================

function setBudgetUsingPrompt() {
    const userBudget = prompt("Enter your monthly budget in KSh:");

    if (userBudget === null || userBudget.trim() === "") {
        return;
    }

    const enteredBudget = Number(userBudget);

    if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {
        alert("Please enter a valid budget greater than zero.");
        return;
    }

    budget = enteredBudget;

    localStorage.setItem("spendwise-budget", budget);

    updateDashboard();

    alert("Your budget has been saved successfully!");
}

// Connect prompt button to the function
promptBudgetButton.addEventListener("click", setBudgetUsingPrompt);

// ======================================
// 13. COLLECT BUDGET FROM FORM
// ======================================

budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const enteredBudget = Number(budgetInput.value);

    if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {
        budgetStatusElement.textContent =
            "Please enter a budget greater than zero.";

        return;
    }

    budget = enteredBudget;

    localStorage.setItem("spendwise-budget", budget);

    updateDashboard();

    formMessageElement.textContent = "";
    budgetForm.reset();
});

// ======================================
// 14. COLLECT AND ADD EXPENSES
// ======================================

expenseForm.addEventListener("submit", function(event) {
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
            "Please enter a valid expense amount.";

        return;
    }

    const expense = {
        id: Date.now().toString() + "-" +
            Math.random().toString(36).slice(2, 8),

        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    saveExpenses();
    updateDashboard();

    formMessageElement.textContent =
        "Expense added successfully.";

    expenseForm.reset();

    expenseDateInput.value = new Date().toLocaleDateString("en-CA");
});

// ======================================
// 15. DELETE EXPENSES
// ======================================

expenseListElement.addEventListener("click", function(event) {
    const button = event.target.closest("button.delete-button");

    if (!button) {
        return;
    }

    const expenseIndex = expenses.findIndex(function(expense) {
        return expense.id === button.dataset.id;
    });

    if (expenseIndex === -1) {
        return;
    }

    expenses.splice(expenseIndex, 1);

    saveExpenses();
    updateDashboard();

    formMessageElement.textContent =
        "Expense deleted successfully.";
});

// ======================================
// 16. START APPLICATION
// ======================================

expenseDateInput.value = new Date().toLocaleDateString("en-CA");

updateDashboard();

console.log("SpendWise JavaScript loaded successfully!");

// WEEK 5: JavaScript Foundation

// Collect user input using prompts
const week5BudgetInput = prompt("Enter your monthly budget (KSh):");
const week5ExpensesInput = prompt("Enter your total expenses (KSh):");

// Convert input into numbers
const week5Budget = Number(week5BudgetInput);
const week5Expenses = Number(week5ExpensesInput);

// Function to calculate remaining balance
function calculateWeek5RemainingBalance(budgetAmount, expenseAmount) {
    return budgetAmount - expenseAmount;
}

// Calculate and display results
if (
    week5BudgetInput !== null &&
    week5ExpensesInput !== null &&
    week5BudgetInput.trim() !== "" &&
    week5ExpensesInput.trim() !== "" &&
    Number.isFinite(week5Budget) &&
    Number.isFinite(week5Expenses) &&
    week5Budget >= 0 &&
    week5Expenses >= 0
) {
    const week5RemainingBalance = calculateWeek5RemainingBalance(
        week5Budget,
        week5Expenses
    );

    console.log("WEEK 5 SPENDWISE RESULTS");
    console.log("Monthly Budget: KSh " + week5Budget.toFixed(2));
    console.log("Total Expenses: KSh " + week5Expenses.toFixed(2));
    console.log("Remaining Balance: KSh " + week5RemainingBalance.toFixed(2));
} else {
    console.log("Please enter valid positive numbers.");
}