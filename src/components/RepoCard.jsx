import "./RepoCard.css";
import Heatmap from "./HeatmapCalendar";

export function RepoCard() {
  return (
    <div className="repo-card">
      <div className="calendar-container">
        <Heatmap />
      </div>
      <div className="total-commits-container">total commits: 35</div>
      <div className="streak-container">longest streak: 2 days</div>
    </div>
  );
}
