export const parseLocalDate = (date) => {
  if (date instanceof Date) return new Date(date);

  return new Date(`${date}T00:00:00`);
};

export const getMonthKey = (date) => {
  const d = parseLocalDate(date);

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}`;
};

export const getNextMonthKey = (date) => {
  const d = parseLocalDate(date);

  const nextMonthDate = new Date(
    d.getFullYear(),
    d.getMonth() + 1,
    1
  );

  return getMonthKey(nextMonthDate);
};

export const formatMonthLabel = (monthKey) => {
  if (!monthKey) return "";

  const [year, month] = monthKey.split("-");
  const date = new Date(
    Number(year),
    Number(month) - 1,
    1
  );

  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export const formatDateInputValue = (
  date = new Date()
) => {
  const d =
    date instanceof Date
      ? date
      : parseLocalDate(date);

  const year = d.getFullYear();
  const month = String(
    d.getMonth() + 1
  ).padStart(2, "0");
  const day = String(d.getDate()).padStart(
    2,
    "0"
  );

  return `${year}-${month}-${day}`;
};