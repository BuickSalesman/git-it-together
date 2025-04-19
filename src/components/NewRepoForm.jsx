import { useState } from "react";

import axios from "axios";

export function NewRepoForm({ API_URL, onClose }) {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const params = new FormData(event.target);

    axios
      .post(`${API_URL}/repos/create/`, params, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((reponse) => {
        console.log(reponse.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors(["An unknown error occurred."]);
        }
      });
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
