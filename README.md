# SpendWise

SpendWise is a simple budgeting application designed to help users keep track of their monthly budget, expenses, savings, and remaining balance. The project uses HTML and CSS for the interface and JavaScript to process budgeting information.

## JavaScript Concepts Implemented

This project demonstrates several JavaScript concepts covered during the week:

* Variables
* Data types
* User input
* Type conversion
* Arithmetic calculations
* Functions
* Conditional statements
* Console output

## Variables

Variables are used to store important information in the application. For example, the `budget` variable stores the user's monthly budget, while variables such as `foodExpense`, `transportExpense`, `rentExpense`, and `entertainmentExpense` store different expense amounts.

The project uses `let` variables because the values can change when the user enters different information.

## User Input

SpendWise collects information from the user using JavaScript's `prompt()` function.

The user is asked to enter their monthly budget and different expense amounts. The `parseFloat()` function converts the values entered by the user from text into numbers so that they can be used in calculations.

For example:

```javascript
budget = parseFloat(prompt("Enter your monthly budget (KSh):"));
```

## Calculations

JavaScript is used to calculate the total expenses and remaining balance.

The total expenses are calculated by adding the different expense categories:

```javascript
expenses = foodExpense + transportExpense + rentExpense + entertainmentExpense;
```

The remaining balance is calculated by subtracting total expenses from the budget:

```javascript
remainingBalance = budget - expenses;
```

This allows SpendWise to determine how much money the user has left after their expenses.

## Functions

Functions are used to organize the application's logic and make the code reusable.

The `calculateTotalExpenses()` function calculates the total amount spent across the different expense categories.

The `calculateRemainingBalance()` function calculates the amount remaining after expenses have been deducted from the budget.

The `displayBudgetSummary()` function displays the budgeting information clearly in the browser console.

Using functions makes the code easier to read, maintain, test, and reuse.

## Displaying Results

The calculated results are displayed in the browser console using `console.log()`.

The console displays:

* Total budget
* Total expenses
* Remaining balance
* Savings
* Individual expense categories
* Budget status

If the remaining balance is positive, the application reports the amount remaining. If expenses are greater than the budget, the application reports how much the user is over budget.

## Testing

The application was tested by entering different budget and expense amounts through the JavaScript prompts. The results were checked in the browser console to make sure the calculations were correct.

## Project Files

```text
SpendWise/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Conclusion

SpendWise has been extended from a visual budgeting interface into an application that can process user data. JavaScript variables, user input, calculations, functions, and conditional statements are used to calculate and display useful budgeting information.

