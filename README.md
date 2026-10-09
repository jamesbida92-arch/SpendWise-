
# SpendWise - Interactive Budget Tracker

## Project Overview

SpendWise is a personal budgeting application built with HTML, CSS, and JavaScript. It helps users set a monthly budget, record expenses, monitor their remaining balance, and review spending by category.

## Improvements Made This Week

- Added a form for setting a monthly budget.
- Added an expense form with name, amount, category, and date.
- Added an expense table that displays recorded expenses.
- Added the ability to delete individual expenses.
- Added automatic calculations for total expenses and remaining balance.
- Added budget status messages and spending warnings.
- Added a summary of expenses by category.
- Improved the dashboard layout for mobile and desktop screens.

## JavaScript Concepts Implemented

### 1. Conditional Statements

The application uses `if`, `else if`, and `else` statements to make decisions. It checks whether a budget has been set, whether expenses exceed the budget, whether the budget has been fully used, and whether spending has reached 80% of the budget.

### 2. Arrays

The `expenses` array stores multiple expense objects. Each object contains an ID, name, amount, category, and date.

The `push()` method adds a new expense, while `splice()` removes an expense after the user selects Delete.

### 3. Loops

The application uses `for` loops to calculate total expenses, display expense records, and group spending by category. These loops process multiple records without creating separate variables for each expense.

### 4. DOM Manipulation

The application uses methods such as `getElementById()`, `createElement()`, `appendChild()`, `append()`, and `textContent` to update webpage content.

When an expense is added or deleted, the dashboard recalculates the totals and refreshes the expense table and category summary.

### 5. Event Listeners

The application uses `submit` event listeners for the budget and expense forms. The `preventDefault()` method stops form submission from reloading the page.

A `click` event listener on the expense table handles Delete button actions.

### 6. Functions and Calculations

Reusable functions calculate total expenses, calculate the remaining balance, format currency, evaluate budget status, display expense records, and update the dashboard.

The remaining balance is calculated by subtracting total expenses from the monthly budget.

## How to Run the Project

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Enter a monthly budget and click Set Budget.
5. Add expenses using the expense form.
6. Review the dashboard totals, budget status, expense records, and category summary.
7. Use Delete to remove an expense and verify that the totals update.

No additional packages are required.

## Challenges and Solutions

### Challenge 1: Managing Multiple Expenses

Using separate variables for each expense would make the application difficult to maintain.

**Solution:** An array of expense objects stores multiple records and allows the application to process them with loops.

### Challenge 2: Keeping Dashboard Totals Accurate

Adding or removing expenses changes the total spending and remaining balance.

**Solution:** The `updateDashboard()` function recalculates the values and refreshes the relevant webpage sections after each change.

### Challenge 3: Providing Budget Feedback

Users need to know when their spending is getting close to or has exceeded their budget.

**Solution:** Conditional statements display different messages depending on the budget and spending totals.

### Challenge 4: Handling User Input

Empty fields and invalid amounts can cause incorrect results.

**Solution:** The forms use required fields, input constraints, and JavaScript validation before accepting data.

## Current Limitations

Expense records are stored in a JavaScript array in memory. They are not saved permanently, so refreshing the page clears the records and resets the budget.

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Author

SpendWise Budget Tracker Project