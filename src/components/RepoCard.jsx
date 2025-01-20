import "./RepoCard.css";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const today = new Date();

export function RepoCard() {
  return (
    <div className="repo-card">
      <ReactCalendarHeatmap
        startDate={shiftDate(today, -150)}
        endDate={today}
        values={[
          { date: "2025-01-01", count: 12 },
          { date: "2025-01-02", count: 122 },
          { date: "2025-01-10", count: 38 },
        ]}
        showWeekdayLabels={true}
      />
    </div>
  );

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }
}
