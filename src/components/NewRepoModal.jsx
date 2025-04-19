import { NewRepoForm } from "./NewRepoForm";

export function NewRepoModal({ API_URL, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <NewRepoForm API_URL={API_URL} onClose={onClose} />
      </div>
    </div>
  );
}
