export const getMonthKey = (date) => {
  const d = new Date(date);

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}`;
};

export const getNextMonthKey = (date) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);

  return getMonthKey(d);
};

export const formatMonthLabel = (monthKey) => {
  if (!monthKey) return "";

  const [year, month] = monthKey.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};