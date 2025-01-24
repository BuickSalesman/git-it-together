import "./RepoCard.css";
import Heatmap from "./HeatmapCalendar";

export function RepoCard({ repo, commits }) {
  return (
    <div className="repo-card">
      <h3>{repo.name}</h3>
      <div className="calendar-container">
        <Heatmap commits={commits} />
      </div>
      <div className="total-commits-container">total commits: 35</div>
      <div className="streak-container">longest streak: 2 days</div>
      <div className="last-updated">Last commit: {new Date(repo.updated_at).toLocaleString()}</div>
    </div>
  );
}
