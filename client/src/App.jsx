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
import { fetchExpenses, createExpense, updateExpense, deleteExpense } from './services/expenseApi';

const defaultExpenses = [
  {
    _id: 1,
    label: "Dinner",
    amount: 800,
    date: "2026-03-25",
  },
  {
    _id: 2,
    label: "Fuel",
    amount: 1200,
    date: "2026-03-26",
  },
  {
    _id: 3,
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
  
  const handleAddExpense = async (newExpense) => {
    try {
      const savedExpense =
        await createExpense(newExpense);

      setExpenses((prev) => [
        savedExpense,
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);

      setExpenses((prev) =>
        prev.filter(
          (expense) =>
            expense._id !== expenseId
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateExpense = async (updatedExpense, updatedExpenseId) => {
    try {
      const savedExpense =
        await updateExpense(
          updatedExpenseId,
          updatedExpense
        );

      setExpenses((prev) =>
        prev.map((expense) =>
          expense._id === savedExpense._id
            ? savedExpense
            : expense
        )
      );
    } catch (error) {
      console.error(error);
    }
};

  const filteredExpenses = expenses
  .filter((expense) => {
    const expenseMonth = new Date(expense.date).getMonth();
    return expenseMonth === selectedMonth;
  })
  .sort((a, b) => {
      const dateDiff =
      new Date(b.date) - new Date(a.date);

      if (dateDiff !== 0) return dateDiff;

      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
  });

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
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadExpenses();
  }, []);

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
