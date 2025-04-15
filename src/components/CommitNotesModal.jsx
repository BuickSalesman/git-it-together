import "./CommitNotesModal.css";
import dayjs from "dayjs";

export default function NotesModal({ onClose, commits }) {
  let commitCount = commits.length;

  return (
    <div className="commits-modal-backdrop">
      <div className="commits-modal-content">
        <div>{commitCount} commit(s) on this day!</div>
        {commits.map((commit) => {
          const localTime = dayjs(commit.created_at).format("YYYY-MM-DD h:mm A");
          return (
            <div key={commit.id}>
              <h4>{commit.note_title}</h4>
              <p>{commit.note_body}</p>
              <p>Created at: {localTime}</p>
            </div>
          );
        })}
      </div>
      <button className="commit-modal-close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}
