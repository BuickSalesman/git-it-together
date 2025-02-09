import { useState } from "react";
import axios from "axios";
import { NewCommitModal } from "./NewCommitModal";
import "./NewCommitButton.css";

export default function NewCommitButton({ repoName, notesEnabled, onCommitCreated }) {
  const [showModal, setShowModal] = useState(false);

  const handleDirectCommit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/commits/create/",
        { name: repoName },
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // If the repo does NOT have notes enabled
  if (!notesEnabled) {
    return (
      <button className="new-commit-button" onClick={handleDirectCommit}>
        Add Commit
      </button>
    );
  }

  // Notes enabled
  return (
    <>
      <button className="new-commit-button" onClick={handleOpenModal}>
        Add Commit
      </button>

      {showModal && <NewCommitModal onClose={handleCloseModal} repoName={repoName} onCommitCreated={onCommitCreated} />}
    </>
  );
}
