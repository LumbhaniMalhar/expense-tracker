# 💰 Expense Tracker

A front-end web application for managing personal expenses, built with React for Hybrid Financial Assessment.

## 🛠️ Getting Started

Follow these steps to set up the project and run it locally:
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the frontend** (runs on port 3000):
   ```bash
   npm run start:frontend
   ```
The app will be available at [http://localhost:3000](http://localhost:3000).

To run the tests:
```bash
npm test
```

## 🛠️ Technologies Used

- React 18.3.1
- Redux 5.0.1 with Redux Toolkit and Redux Thunk
- React Router 6.26.2
- Material-UI 6.1.2
- Chart.js 4.4.4 with react-chartjs-2
- Framer Motion 11.11.1
- React Hook Form 7.53.0
- Jest and React Testing Library for unit testing

## 🚀 Features

- Add, view, edit, and delete expense entries
- Responsive design for various screen sizes
- Data visualization with charts
- Filter expenses by category and type
- Redux state management
- Local storage for data persistence

## 📁 Project Structure

```
expense-tracker/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── routes/
│   ├── slices/
│   ├── tests/
│   ├── utils/
│   ├── App.js
│   └── store.js
└── package.json
```

- `components/`: Contains React components, including the main views and reusable UI elements.
- `hooks/`: Custom React hooks, such as `useSnackBar.js` for notifications.
- `routes/`: Defines the application's routing structure.
- `slices/`: Redux slice for managing expense data.
- `tests/`: Unit tests for components.
- `utils/`: Utility functions and constants.
- `App.js`: Main application component.
- `store.js`: Redux store configuration.

## ℹ️ Additional Information

- Built with React 18.3.1 and Redux 5.0.1
- Uses Material-UI for consistent styling
- Implements Chart.js for data visualization
- Fully responsive design
- Local storage used for data persistence between sessions