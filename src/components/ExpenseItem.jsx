function ExpenseItem({
  expense,
  onDelete,
  onEdit,
}) {
  const { label, amount, date, id } = expense;

  const formattedDate = new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  );

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow">
        <div>
            <p className="font-medium">{label}</p>

            <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">
                {formattedDate}
                </p>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {expense.paymentMode === "credit"
                    ? "Credit"
                    : "Cash"}
                </span>
            </div>
        </div>

      <div className="flex items-center gap-3">
        <p className="font-semibold">₹{amount}</p>

        <button
          onClick={() => onEdit(expense)}
          className="text-sm text-blue-500"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(id)}
          className="text-sm text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;