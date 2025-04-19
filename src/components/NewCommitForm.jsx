import { useState } from "react";
import axios from "axios";
import "./NewCommitForm.css";

export function NewCommitForm({ API_URL, repoName, onClose, onCommitCreated }) {
  const [errors, setErrors] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${API_URL}commits/create/`,
        {
          name: repoName,
          note_title: noteTitle,
          note_body: noteBody,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      onCommitCreated?.(response.data); // if parent provided a callback
      onClose?.(); // close modal after successful commit
      window.location.reload();
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors([error.response.data.error]);
      } else if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["An unknown error occurred."]);
      }
    }
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
        <button
          type="button"
          onClick={() => {
            onClose?.();
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
