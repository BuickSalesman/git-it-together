import { useState } from "react";

export function NewRepoForm({ onSubmit, onClose }) {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const form = new FormData(event.target);
    const name = form.get("name");
    const notes_enabled = form.get("notes_enabled") === "true";

    if (!name) {
      setErrors(["Name is required"]);
      return;
    }

    onSubmit({ name, notes_enabled });
    event.target.reset;
  };

  return (
    <div id="new-repo-form-container">
      {errors && errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} id="new-repo-form">
        <div>
          Name: <input type="text" name="name" />
        </div>
        <div>
          Notes Enabled:
          <input type="hidden" name="notes_enabled" value="false" />
          <input type="checkbox" name="notes_enabled" value="true" />
        </div>
        <button type="submit">Submit</button>
        <button className="close" onClick={onClose}>
          &times;
        </button>
      </form>
    </div>
  );
}
