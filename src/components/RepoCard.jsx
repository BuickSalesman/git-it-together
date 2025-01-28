import "./RepoCard.css";
import Heatmap from "./HeatmapCalendar";

import { DeleteRepoModal } from "./DeleteRepoModal";
import { useState } from "react";

function getLongestStreak(commitDates) {
  if (commitDates.length === 0) return 0;

  const dates = commitDates.map((dateStr) => new Date(dateStr + "T00:00:00")).sort((a, b) => a - b);

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diffInMonths = dates[i] - dates[i - 1];
    const diffInDays = diffInMonths / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);
  return longestStreak;
}

export function RepoCard({ repo, commits }) {
  const [showModal, setShowModal] = useState(false);

  const totalCommits = commits.length;

  const uniqueDays = Array.from(new Set(commits.map((commit) => commit.created_at.slice(0, 10))));
  const longestStreak = getLongestStreak(uniqueDays);

  return (
    <div className="repo-card">
      <div className="username-and-delete-container">
        <button className="new-commit-button">Add Commit</button>
        <h3>{repo.name}</h3>
        <button className="delete-button" onClick={() => setShowModal(true)}>
          &times;
        </button>
      </div>
      <div className="calendar-container">
        <Heatmap commits={commits} repoCreationDate={repo.created_at} />
      </div>
      <div className="total-commits-container">total commits: {totalCommits}</div>
      <div className="streak-container">longest streak: {longestStreak} days</div>
      <div className="last-updated">Last commit: {new Date(repo.updated_at).toLocaleString()}</div>

      {showModal && <DeleteRepoModal onClose={() => setShowModal(false)} repoName={repo.name} />}
    </div>
  );
}
