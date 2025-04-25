import { NewRepoForm } from "./NewRepoForm";

export function NewRepoModal({ onSubmit, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <NewRepoForm onSubmit={onSubmit} onClose={onClose} />
      </div>
    </div>
  );
}
