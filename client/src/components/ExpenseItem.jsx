import { Pencil, Trash2 } from "lucide-react";

function ExpenseItem({
  expense,
  onDelete,
  onEdit,
}) {
  const { label, amount, date, _id } = expense;

  const formattedDate = new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  );

  const handleDelete = (expenseId) => {
    const confirmed = window.confirm(
      "Delete this expense?"
    );

    if (confirmed) {
      onDelete(expenseId);
    }
  };

  return (
    <div key={expense._id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow">
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

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Pencil size={18} className="text-gray-600" />
          </button>

          <button
            onClick={() => handleDelete(expense._id)}
            className="p-2 rounded-full hover:bg-red-50"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;