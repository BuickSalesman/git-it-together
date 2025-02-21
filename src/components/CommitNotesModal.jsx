export default function NotesModal({ onClose, commits }) {
  return (
    <div>
      <div>
        {commits.map((commit) => (
          <div key={commit.id}>
            <h4>{commit.note_title}</h4>
            <p>{commit.note_body}</p>
            <p>Created at: {commit.created_at}</p>
          </div>
        ))}
      </div>
      <button onClick={onClose}>&times;</button>
    </div>
  );
}
