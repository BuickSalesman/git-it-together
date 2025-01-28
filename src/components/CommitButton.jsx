import axios from "axios";
import React from "react";
import "./CommitButton.css";

export default function CommitButton({ repoName, onCommitCreated }) {
  const handleCommit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:8000/commits/create/",
        {
          name: repoName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (onCommitCreated) {
        onCommitCreated(response.data);
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="new-commit-button" onClick={handleCommit}>
      Add Commit
    </button>
  );
}
