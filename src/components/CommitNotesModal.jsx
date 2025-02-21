export default function NotesModal({ onClose, commits }) {
  return (
    <div>
      <div>hello world</div>
      <div>{commits}</div>
      <button onClick={onClose}>&times;</button>
    </div>
  );
}
