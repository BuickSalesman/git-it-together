import { DeleteRepoForm } from "./DeleteRepoForm";
import "./DeleteRepoModal.css";

export function DeleteRepoModal({ API_URL, onClose, repoName }) {
  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <DeleteRepoForm API_URL={API_URL} repoName={repoName} onClose={onClose} />
      </div>
    </div>
  );
}
