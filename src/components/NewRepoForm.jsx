import { useState } from "react";

import axios from "axios";

export function NewRepoForm() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const params = new FormData(event.target);

    axios
      .post("http://localhost:8000/repos/create/", params)
      .then((reponse) => {
        console.log(reponse.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="new-repo-form-container">
      {errors.length > 0 && (
        <ul>
          {errors.map((error) => {
            <li key={error}>{error}</li>;
          })}
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
      </form>
    </div>
  );
}
