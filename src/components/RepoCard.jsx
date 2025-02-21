import "./RepoCard.css";
import NewCommitButton from "./NewCommitButton";
import Heatmap from "./HeatmapCalendar";
import dayjs from "dayjs";

import { DeleteRepoModal } from "./DeleteRepoModal";
import { useState } from "react";

function getLongestStreak(commitDates) {
  if (commitDates.length === 0) return 0;

  const dates = commitDates.map((dateStr) => dayjs(dateStr)).sort((a, b) => a.valueOf() - b.valueOf());

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diffInDays = dates[i].diff(dates[i - 1], "day");
    if (diffInDays === 1) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }

  return Math.max(longestStreak, currentStreak);
}

const handleNewCommit = (createdCommitData) => {
  console.log("New commit created:", createdCommitData);
};

export function RepoCard({ repo, commits }) {
  const [showModal, setShowModal] = useState(false);

  const totalCommits = commits.length;

  const uniqueDays = Array.from(new Set(commits.map((commit) => commit.created_at.slice(0, 10))));
  const longestStreak = getLongestStreak(uniqueDays);

  return (
    <div className="repo-card">
      <div className="username-and-delete-container">
        <NewCommitButton repoName={repo.name} notesEnabled={repo.notes_enabled} onCommitCreated={handleNewCommit} />
        <h3>{repo.name}</h3>
        <button className="delete-button" onClick={() => setShowModal(true)}>
          &times;
        </button>
      </div>
      <div className="calendar-container">
        <Heatmap commits={commits} repoCreationDate={repo.created_at} notesEnabled={true} />
      </div>
      <div className="total-commits-container">total commits: {totalCommits}</div>
      <div className="streak-container">longest streak: {longestStreak} days</div>
      <div className="last-updated">Last commit: {new Date(repo.updated_at).toLocaleString()}</div>
      <div className="last-updated">created on: {new Date(repo.created_at).toLocaleString()}</div>

      {showModal && <DeleteRepoModal onClose={() => setShowModal(false)} repoName={repo.name} />}
    </div>
  );
}
