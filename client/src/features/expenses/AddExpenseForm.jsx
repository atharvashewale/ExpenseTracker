import { useState, useEffect } from "react";
import { getMonthKey, getNextMonthKey, formatMonthLabel, formatDateInputValue } from "../../utils/date";

function AddExpenseForm({ isOpen, onAddExpense, onUpdateExpense, editingExpense, onClose }) {
    const today = formatDateInputValue();

    const getDefaultFormState = (dateValue = today) => ({
        label: "",
        amount: "",
        date: dateValue,
        paymentMode: "cash",
        cycleMonth: getMonthKey(dateValue),
    });

    const [formData, setFormData] = useState(
        getDefaultFormState()
    );

    const currentCycleOption = getMonthKey(formData.date);
    const nextCycleOption = getNextMonthKey(formData.date);

    const [error, setError] = useState("");

    const handleChange = (field, value) => {
        setFormData((prev) => {
            const updated = {
            ...prev,
            [field]: value,
            };

            if (field === "date") {
            updated.cycleMonth = getMonthKey(value);
            }

            return updated;
        });

        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const label = formData.label.trim();
        const amount = Number(formData.amount);

        if (!label) {
            setError("Please enter an expense label");
            return;
        }

        if (!amount || amount <= 0) {
            setError("Amount must be greater than 0");
            return;
        }

        const expensePayload = {
            label,
            amount,
            date: formData.date,
            paymentMode: formData.paymentMode,
            cycleMonth: formData.paymentMode === "credit" ? formData.cycleMonth : null,
        };

        if (editingExpense) {
            onUpdateExpense(expensePayload, editingExpense ? editingExpense._id: Date.now());
        } else {
            onAddExpense(expensePayload);
        }

        setFormData(getDefaultFormState());

        setError("");
        onClose();
    };

    useEffect(() => {
        if (!isOpen) return;

        if (editingExpense) {
            setFormData({
            label: editingExpense.label,
            amount: editingExpense.amount,
            date: formatDateInputValue(editingExpense.date),
            paymentMode:
                editingExpense.paymentMode || "cash",
            cycleMonth:
                editingExpense.cycleMonth ||
                getMonthKey(editingExpense.date),
            });
        } else {
            setFormData(getDefaultFormState());
        }

        setError("");
    }, [isOpen, editingExpense]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
        <h2 className="text-lg font-semibold">
            { editingExpense ? "Edit Expense" : "Add Expense"}
        </h2>

      <input
        type="text"
        placeholder="Expense label"
        value={formData.label}
        onChange={(e) =>
          handleChange("label", e.target.value)
        }
        className="w-full border rounded-lg px-3 py-2"
      />

      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) =>
          handleChange("amount", e.target.value)
        }
        className="w-full border rounded-lg px-3 py-2"
      />

      <input
        type="date"
        value={formData.date}
        onChange={(e) =>
          handleChange("date", e.target.value)
        }
        className="w-full border rounded-lg px-3 py-2"
      />

        <select
            value={formData.paymentMode}
            onChange={(e) =>
                handleChange("paymentMode", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2"
            >
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
        </select>

        {formData.paymentMode === "credit" && (
            <select
                value={formData.cycleMonth}
                onChange={(e) =>
                handleChange("cycleMonth", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
            >
                <option value={currentCycleOption}>
                    {formatMonthLabel(currentCycleOption)}
                </option>
                <option value={nextCycleOption}>
                    {formatMonthLabel(nextCycleOption)}
                </option>
            </select>
        )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg"
      >
        { editingExpense ? "Update Expense" : "Add Expense" }
      </button>

        <button
            type="button"
            onClick={onClose}
            className="w-full border py-2 rounded-lg"
            >
            Cancel
        </button>
    </form>
  );
}

export default AddExpenseForm;