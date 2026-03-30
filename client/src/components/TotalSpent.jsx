import { formatMonthLabel } from "../utils/date";

function TotalSpent({
  monthlyTotal,
  latestCycleTotal,
  latestCycleMonth,
  previousCycleTotal,
  previousCycleMonth,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 space-y-3">
      {/* Monthly total */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          This Month
        </p>
        <p className="text-xl font-bold">
          ₹{monthlyTotal}
        </p>
      </div>

      {/* Latest credit cycle */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            Credit Cycle
          </p>
          <p className="text-xs text-gray-400">
            {formatMonthLabel(latestCycleMonth)}
          </p>
        </div>

        <p className="font-semibold">
          ₹{latestCycleTotal}
        </p>
      </div>

      {/* Previous cycle comparison */}
      {previousCycleMonth && (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Prev Cycle
            </p>
            <p className="text-xs text-gray-400">
              {formatMonthLabel(
                previousCycleMonth
              )}
            </p>
          </div>

          <p className="font-medium text-gray-700">
            ₹{previousCycleTotal}
          </p>
        </div>
      )}
    </div>
  );
}

export default TotalSpent;