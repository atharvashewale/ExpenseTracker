const STORAGE_KEY = "expense-tracker-expenses";

export const getStoredExpenses = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse stored expenses", error);
    return [];
  }
};

export const saveExpenses = (expenses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};