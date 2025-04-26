import { useState } from "react";
import "./NewCommitForm.css";

export function NewCommitForm({ onClose, onSubmit }) {
  const [errors, setErrors] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);

    onSubmit({ title: noteTitle, body: noteBody });
    onClose();
  };

  return (
    <div className="new-commit-form-container">
      {errors.length > 0 && (
        <ul>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} id="new-commit-form">
        <div>
          <label>Note Title:</label>
          <input type="text" name="note_title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
        </div>
        <div>
          <label>Note Body:</label>
          <textarea name="note_body" value={noteBody} onChange={(e) => setNoteBody(e.target.value)}></textarea>
        </div>

        <button type="submit">Add Commit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
