import "./RepoCard.css";
import NewCommitButton from "./NewCommitButton";
import Heatmap from "./HeatmapCalendar";
import dayjs from "dayjs";
import axios from "axios";

import { DeleteRepoModal } from "./DeleteRepoModal";
import { useState, useMemo } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

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

export function RepoCard({ API_URL, accessToken, repo }) {
  const [showModal, setShowModal] = useState(false);
  const qc = useQueryClient();

  const allCommits = qc.getQueryData(["commits"]) || [];

  const commits = useMemo(() => allCommits.filter((c) => c.repo_name === repo.name), [allCommits, repo.name]);

  const uniqueDays = Array.from(new Set(commits.map((c) => c.created_at.slice(0, 10))));
  const longestStreak = getLongestStreak(uniqueDays);
  const totalCommits = commits.length;

  const addCommit = useMutation({
    mutationFn: (newCommit) =>
      axios
        .post(`${API_URL}/commits/create/`, {
          name: repo.name,
          note_title: newCommit.title,
          note_body: newCommit.body,
        })
        .then((r) => r.data),
    onMutate: (newCommit) => {
      qc.cancelQueries(["commits"]);
      const previous = qc.getQueryData(["commits"]) || [];
      const temp = {
        id: `temp-${Date.now()}`,
        repo_name: repo.name,
        note_title: newCommit.title,
        note_body: newCommit.body,
        created_at: new Date().toISOString(),
      };
      qc.setQueryData(["commits"], (old) => [...old, temp]);
      return { previous, tempId: temp.id };
    },
    onError: (_err, _new, ctx) => {
      qc.setQueryData(["commits"], ctx.previous);
    },
    onSuccess: (real, _new, ctx) => {
      qc.setQueryData(["commits"], (old) =>
        old.map((c) =>
          c.id === ctx.tempId
            ? {
                id: real.commit_id,
                repo_name: real.repo,
                note_title: real.note_title,
                note_body: real.note_body,
                created_at: real.created_at,
              }
            : c
        )
      );
    },
  });

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
          notesEnabled={repo.notes_enabled}
          onCommitCreated={addCommit.mutate}
          loading={addCommit.isLoading}
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
