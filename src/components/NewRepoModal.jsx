import { NewRepoForm } from "./NewRepoForm";

export function NewRepoModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <NewRepoForm onClose={onClose} />
      </div>
    </div>
  );
}
