// NewCommitModal.jsx

import { NewCommitForm } from "./NewCommitForm";
import "./NewCommitModal.css";

export function NewCommitModal({ onClose, repoName, onCommitCreated }) {
  const handleBackdropClick = (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      onClose?.();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <NewCommitForm repoName={repoName} onClose={onClose} onCommitCreated={onCommitCreated} />
      </div>
    </div>
  );
}
