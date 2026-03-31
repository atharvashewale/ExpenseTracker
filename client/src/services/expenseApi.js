const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const fetchExpenses = async () => {
  const response = await fetch(
    `${API_BASE_URL}/expenses`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch expenses"
    );
  }

  return response.json();
};

export const createExpense = async (
  expense
) => {
  const response = await fetch(
    `${API_BASE_URL}/expenses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create expense"
    );
  }

  return response.json();
};

export const updateExpense = async (
  _id,
  expense
) => {
  const response = await fetch(
    `${API_BASE_URL}/expenses/${_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to update expense"
    );
  }

  return response.json();
};

export const deleteExpense = async (_id) => {
  const response = await fetch(
    `${API_BASE_URL}/expenses/${_id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete expense"
    );
  }
};