import "./CommitNotesModal.css";

export default function NotesModal({ onClose, commits }) {
  return (
    <div className="commits-modal-backdrop">
      <div className="commits-modal-content">
        {commits.map((commit) => (
          <div key={commit.id}>
            <h4>{commit.note_title}</h4>
            <p>{commit.note_body}</p>
            <p>Created at: {commit.created_at}</p>
          </div>
        ))}
      </div>
      <button className="commit-modal-close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}
