// SpendWise - Budget Management JavaScript

// 1. Application data
let budget = 0;
let expenses = 0;
let remainingBalance = 0;

// Expense categories
let foodExpense = 0;
let transportExpense = 0;
let rentExpense = 0;
let entertainmentExpense = 0;
let savings = 0;

// 2. Reusable functions

// Calculate total expenses
function calculateTotalExpenses() {
    return foodExpense + transportExpense + rentExpense + entertainmentExpense;
}

// Calculate remaining budget
function calculateRemainingBalance(budget, expenses) {
    return budget - expenses;
}

// Display budget information in the console
function displayBudgetSummary() {
    console.log("===== SpendWise Budget Summary =====");
    console.log("Total Budget: KSh " + budget.toFixed(2));
    console.log("Total Expenses: KSh " + expenses.toFixed(2));
    console.log("Remaining Balance: KSh " + remainingBalance.toFixed(2));
    console.log("Savings: KSh " + savings.toFixed(2));
    console.log("====================================");
}

// 3. Collect user input

budget = parseFloat(prompt("Enter your monthly budget (KSh):"));

foodExpense = parseFloat(prompt("Enter your Food expenses (KSh):"));
transportExpense = parseFloat(prompt("Enter your Transport expenses (KSh):"));
rentExpense = parseFloat(prompt("Enter your Rent expenses (KSh):"));
entertainmentExpense = parseFloat(
    prompt("Enter your Entertainment expenses (KSh):")
);
savings = parseFloat(prompt("Enter your Savings amount (KSh):"));

// 4. Perform calculations

expenses = calculateTotalExpenses();

remainingBalance = calculateRemainingBalance(budget, expenses);

// 5. Display results in the browser console

displayBudgetSummary();

console.log("Food: KSh " + foodExpense.toFixed(2));
console.log("Transport: KSh " + transportExpense.toFixed(2));
console.log("Rent: KSh " + rentExpense.toFixed(2));
console.log("Entertainment: KSh " + entertainmentExpense.toFixed(2));

if (remainingBalance >= 0) {
    console.log(
        "Status: You have KSh " +
        remainingBalance.toFixed(2) +
        " remaining."
    );
} else {
    console.log(
        "Status: You are over budget by KSh " +
        Math.abs(remainingBalance).toFixed(2) +
        "."
    );
}