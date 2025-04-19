// NewCommitModal.jsx

import { NewCommitForm } from "./NewCommitForm";
import "./NewCommitModal.css";

export function NewCommitModal({ API_URL, onClose, repoName, onCommitCreated }) {
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

        <NewCommitForm API_URL={API_URL} repoName={repoName} onClose={onClose} onCommitCreated={onCommitCreated} />
      </div>
    </div>
  );
}
