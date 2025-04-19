import "./RepoCard.css";
import NewCommitButton from "./NewCommitButton";
import Heatmap from "./HeatmapCalendar";
import dayjs from "dayjs";

import { DeleteRepoModal } from "./DeleteRepoModal";
import { useState } from "react";

/**
 * Something about this streak is broken. I think the general idea for how this works is solid, but I am suspicious that I something isn't quite right with dayjs and timezones. I have fixes for this in other parts of the app, that I need to go and explore to remember exactly how to fix this.
 */

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

export function RepoCard({ API_URL, repo, commits }) {
  const [showModal, setShowModal] = useState(false);

  const totalCommits = commits.length;

  const uniqueDays = Array.from(new Set(commits.map((commit) => commit.created_at.slice(0, 10))));
  const longestStreak = getLongestStreak(uniqueDays);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="repo-card">
      <div className="username-and-delete-container">
        <NewCommitButton
          API_URL={API_URL}
          repoName={repo.name}
          notesEnabled={repo.notes_enabled}
          onCommitCreated={handleNewCommit}
        />
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
      <div className="last-updated">Last commit: {new Date(repo.updated_at).toLocaleString("en-US", options)}</div>
      <div className="last-updated">created on: {new Date(repo.created_at).toLocaleString("en-US", options)}</div>

      {showModal && <DeleteRepoModal API_URL={API_URL} onClose={() => setShowModal(false)} repoName={repo.name} />}
    </div>
  );
}
