import { useState } from "react";
import axios from "axios";
import "./DeleteRepoForm.css";

export function DeleteRepoForm({ API_URL, repoName, onClose }) {
  const [typedName, setTypedName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    axios
      .delete(`${API_URL}repos/delete/`, {
        data: { name: typedName },
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((reponse) => {
        console.log(reponse.data);
        event.target.reset();
        onClose && onClose();
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          setErrors([error.response.data.error]);
        } else if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors(["An unknown error occurred."]);
        }
      });
  };

  return (
    <div id="delete-repo-form-container">
      {errors && errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} id="delete-repo-form">
        <div>
          <label>
            Please type <strong>{repoName}</strong> to confirm:
            <p>This action cannot be undone.</p>
          </label>
          <input type="text" name="name" value={typedName} onChange={(event) => setTypedName(event.target.value)} />
        </div>
        <button type="submit" disabled={typedName !== repoName}>
          Delete
        </button>
      </form>
    </div>
  );
}
