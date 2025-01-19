import { NewRepoForm } from "./NewRepoForm";

export function NewRepoModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <NewRepoForm />
      </div>
    </div>
  );
}
