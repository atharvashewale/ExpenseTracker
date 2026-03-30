function AddExpenseButton({ onClick }) {
  return (
    <button onClick={onClick} className="fixed bottom-6 right-6 bg-black text-white px-3 py-1.5 rounded-full shadow-lg">+ Expense</button>
  );
}

export default AddExpenseButton;