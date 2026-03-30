const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function MonthFilter({ selectedMonth, onMonthChange }) {
  return (
    <div className="mb-4">
      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className="w-full bg-white border rounded-lg px-3 py-2 shadow"
      >
        {months.map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MonthFilter;