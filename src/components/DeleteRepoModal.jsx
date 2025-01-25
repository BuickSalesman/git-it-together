import { DeleteRepoForm } from "./DeleteRepoForm";

export function DeleteRepoModal({ onClose }) {
  return (
    <div className="delete-modal-backdrop">
      <div className="delete-modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <DeleteRepoForm />
      </div>
    </div>
  );
}
