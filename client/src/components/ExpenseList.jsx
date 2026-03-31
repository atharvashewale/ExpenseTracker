import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4 text-center text-gray-500 shadow">
        No expenses for this month
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          onDelete={onDeleteExpense}
          onEdit={onEditExpense}
        >
        </ExpenseItem>
      ))}
    </div>
  );
}

export default ExpenseList;