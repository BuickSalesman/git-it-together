import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const params = new FormData(event.target);
    const password = params.get("password");
    const passwordConfirmation = params.get("password_confirmation");

    if (password !== passwordConfirmation) {
      setErrors(["Passowrds do not match!"]);
      return;
    }

    axios
      .post("http://localhost:8000/users/create/", params)
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
      <ul>
        {errors.map((error) => (
          <li key={error} {...error}></li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Username: <input name="username" type="text" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <div>
          Password Confirmation: <input name="password_confirmation" type="text" />
        </div>
        <button type="submit">Signup!</button>
      </form>
    </div>
  );
}
