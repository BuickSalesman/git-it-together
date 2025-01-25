import { DeleteRepoForm } from "./DeleteRepoForm";
import "./DeleteRepoModal.css";

export function DeleteRepoModal({ onClose, repoName }) {
  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <DeleteRepoForm repoName={repoName} onClose={onClose} />
      </div>
    </div>
  );
}
