// NewCommitButton.jsx
import { useState } from "react";
import { NewCommitModal } from "./NewCommitModal";
import "./NewCommitButton.css";

export default function NewCommitButton({ notesEnabled, onCommitCreated, loading }) {
  const [showModal, setShowModal] = useState(false);

  const handleDirectCommit = () => {
    onCommitCreated({ title: null, body: null });
  };

  const handleModalSubmit = ({ title, body }) => {
    onCommitCreated({ title, body });
    setShowModal(false);
  };

  const label = loading ? "Adding…" : "Add Commit";

  if (!notesEnabled) {
    return (
      <button className="new-commit-button" onClick={handleDirectCommit} disabled={loading}>
        {label}
      </button>
    );
  }

  return (
    <>
      <button className="new-commit-button" onClick={() => setShowModal(true)} disabled={loading}>
        {label}
      </button>

      {showModal && <NewCommitModal onClose={() => setShowModal(false)} onSubmit={handleModalSubmit} />}
    </>
  );
}
