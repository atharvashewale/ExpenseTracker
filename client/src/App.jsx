import { useState, useEffect } from 'react'
import './App.css';
import Layout from './components/Layout';
import Header from './components/Header';
import TotalSpent from './components/TotalSpent';
import ExpenseList from './components/ExpenseList';
import AddExpenseButton from './components/AddExpenseButton';
import AddExpenseForm from './features/expenses/AddExpenseForm';
import { getStoredExpenses, saveExpenses } from './utils/storage';
import MonthFilter from './features/expenses/MonthFilter';
import BottomSheet from './components/BottomSheet';
import { getMonthKey, formatMonthLabel } from './utils/date';

const defaultExpenses = [
  {
    id: 1,
    label: "Dinner",
    amount: 800,
    date: "2026-03-25",
  },
  {
    id: 2,
    label: "Fuel",
    amount: 1200,
    date: "2026-03-26",
  },
  {
    id: 3,
    label: "Groceries",
    amount: 1500,
    date: "2026-03-27",
  },
];

function App() {

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = getStoredExpenses();
    return storedExpenses.length
      ? storedExpenses
      : defaultExpenses;
  });

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth()
  );

  const currentYear = new Date().getFullYear();

  const selectedMonthKey = `${currentYear}-${String(
    selectedMonth + 1
  ).padStart(2, "0")}`;

  const [editingExpense, setEditingExpense] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleAddExpense = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter(
        (expense) => expense.id !== expenseId
      )
    );
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
  };

  const filteredExpenses = expenses
  .filter((expense) => {
    const expenseMonth = new Date(expense.date).getMonth();
    return expenseMonth === selectedMonth;
  })
  .sort((a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  const allCreditExpenses = expenses.filter(
    (expense) =>
      expense.paymentMode === "credit" &&
      expense.cycleMonth
  );

  const sortedCycleMonths = [
    ...new Set(
      allCreditExpenses.map(
        (expense) => expense.cycleMonth
      )
    ),
  ].sort((a, b) => a.localeCompare(b));

  const latestCycleMonth =
  sortedCycleMonths.at(-1) || null;

  const isLatestMonthView = selectedMonthKey === latestCycleMonth;

const previousCycleMonth =
  sortedCycleMonths.at(-2) || null;

const latestCycleTotal = latestCycleMonth
  ? allCreditExpenses
      .filter(
        (expense) =>
          expense.cycleMonth ===
          latestCycleMonth
      )
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      )
  : 0;

const previousCycleTotal = previousCycleMonth
  ? allCreditExpenses
      .filter(
        (expense) =>
          expense.cycleMonth ===
          previousCycleMonth
      )
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      )
  : 0;

  const selectedMonthCycleTotal = allCreditExpenses
    .filter(
      (expense) =>
        expense.cycleMonth ===
        selectedMonthKey
    )
    .reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    );

  const dashboardCycleTotal = isLatestMonthView ? latestCycleTotal : selectedMonthCycleTotal;

  const dashboardCycleMonth = isLatestMonthView ? latestCycleMonth : selectedMonthKey;

  const dashboardPreviousCycleMonth = isLatestMonthView ? previousCycleMonth : null;

  const dashboardPreviousCycleTotal = isLatestMonthView ? previousCycleTotal : 0;

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    document.body.style.overflow = isFormOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFormOpen]);

  return (
    <Layout>
      <Header></Header>
      <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth}></MonthFilter>
      <TotalSpent 
        monthlyTotal = {filteredExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        )}
        latestCycleTotal={dashboardCycleTotal}
        latestCycleMonth={dashboardCycleMonth}
        previousCycleTotal={dashboardPreviousCycleTotal}
        previousCycleMonth={dashboardPreviousCycleMonth}
      >
      </TotalSpent>
      <BottomSheet
        isOpen={isFormOpen}
        onClose={() => {
          setEditingExpense(null);
          setIsFormOpen(false);
        }}
      >
        <AddExpenseForm
          isOpen={isFormOpen}
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
          editingExpense={editingExpense}
          onClose={() => {
            setEditingExpense(null);
            setIsFormOpen(false);
          }}
        />
      </BottomSheet>
      <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} onEditExpense={(expense) => {
          setEditingExpense(expense);
          setIsFormOpen(true);
        }}>
      </ExpenseList>
      <AddExpenseButton onClick={() => { 
          setEditingExpense(null);
          setIsFormOpen(true);
        }}>  
      </AddExpenseButton>
    </Layout>
  );
}

export default App;
