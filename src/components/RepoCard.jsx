import "./RepoCard.css";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const today = new Date();

export function RepoCard() {
  return (
    <div className="repo-card">
      <div className="calendar-container">
        <ReactCalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={today}
          values={[
            { date: "2025-01-01", count: 12 },
            { date: "2025-01-02", count: 122 },
            { date: "2025-01-10", count: 38 },
            { date: "2024-01-01", count: 12 },
            { date: "2024-03-02", count: 122 },
            { date: "2024-03-10", count: 38 },
            { date: "2024-03-03", count: 12 },
            { date: "2024-06-02", count: 122 },
            { date: "2024-06-10", count: 40000 },
            { date: "2024-06-01", count: 12 },
            { date: "2024-10-02", count: 122 },
            { date: "2024-11-10", count: 38 },
          ]}
          showWeekdayLabels={true}
          showOutOfRangeDays={false}
          horizontal={true}
          gutterSize={2}
        />
      </div>
      <div className="total-commits-container">total commits: 35</div>
      <div className="streak-container">longest streak: 2 days</div>
    </div>
  );

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }
}
