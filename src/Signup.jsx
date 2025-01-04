import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:8000/users/", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error} {...error}></li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Username: <input name="name" type="text" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <div>
          Password Confirmation: <input name="password_confirmation" type="text" />
        </div>
      </form>
    </div>
  );
}
