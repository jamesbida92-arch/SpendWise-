# SpendWise Dashboard Shell

## Project Description
SpendWise is a personal financial management dashboard built using HTML and CSS. The project demonstrates a modern, responsive dashboard layout using CSS Grid and Flexbox.

## Technologies Used
- HTML5
- CSS3
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- Media Queries

## Dashboard Features

### 1. Sidebar Navigation
The sidebar contains navigation links for Dashboard, My Budget, Expenses, Reports, Savings, and Settings.

### 2. Dashboard Header
The header displays the financial dashboard title, a welcome message, the current month, and a profile avatar.

### 3. Financial Summary Cards
Three summary cards display:
- Total Budget: KSh 50,000
- Total Expenses: KSh 31,500
- Remaining Balance: KSh 18,500

### 4. Spending Category Cards
Six category cards display static financial information:
- Food
- Transport
- Rent
- Entertainment
- Savings
- Utilities

### 5. CSS Grid and Flexbox
CSS Grid is used for the overall dashboard structure, financial summary section, and category cards.

Flexbox is used to arrange the sidebar navigation, header elements, and individual card contents.

### 6. Responsive Design
A media query adapts the dashboard for screens below 768px. The layout changes into a single-column structure for mobile devices.

### 7. Card Micro-interactions
Dashboard cards include hover and keyboard focus effects using CSS transform and box-shadow transitions. The animations last 250 milliseconds.

### 8. Dark Theme
The project includes a dark theme using the `prefers-color-scheme: dark` media query and CSS custom properties.

## Project Files
- `index.html` – Contains the dashboard structure and static financial information.
- `style.css` – Contains the styling, Grid and Flexbox layouts, responsive design, animations, and dark theme.
- `README.md` – Provides project documentation.

## Testing
The dashboard was tested in a desktop browser and using the browser DevTools Device Toolbar at a mobile width of 390px.

The mobile layout was verified to display correctly.

## Conclusion
This project demonstrates how CSS Grid, Flexbox, CSS custom properties, and responsive design can be used to build a modern financial dashboard. It provides the visual foundation for the SpendWise capstone project.