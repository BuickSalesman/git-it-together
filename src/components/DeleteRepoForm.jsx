import { useState } from "react";

import axios from "axios";

export function DeleteRepoForm() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const params = new FormData(event.target);

    axios
      .post("http://localhost:8000/repos/delete/", params, {
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
          Enter repo name to delete: <input type="text" name="name" />
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
