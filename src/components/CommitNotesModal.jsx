export default function NotesModal({ commitsForDay, onClose }) {
  return (
    <div className="notes-modal-overlay">
      <div className="notes-modal-content">
        <button onClick={onClose}>Close</button>
        <h2>Notes for {commitsForDay?.[0]?.created_at ? commitsForDay[0].created_at.slice(0, 10) : "this day"}</h2>

        {commitsForDay.map((commit) => (
          <div key={commit.id} className="note-item">
            <h4>{commit.noteTitle}</h4>
            <p>{commit.noteBody}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
