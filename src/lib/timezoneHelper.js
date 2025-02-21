function parseTimestamp(tsString) {
  const iso = tsString.replace(" ", "T");
  return new Date(iso);
}

function parseLocalMidnight(dayStr) {
  const [y, m, d] = dayStr.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function formatLocalYYYYMMDD(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMonthsDiff(startDate, endDate) {
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
}

const timezoneHelper = { parseTimestamp, parseLocalMidnight, formatLocalYYYYMMDD, getMonthsDiff };
export default timezoneHelper;
