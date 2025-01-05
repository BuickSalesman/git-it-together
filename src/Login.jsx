import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefaults();
    setErrors([]);
  };

  return (
    <div id="Login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => {
          <li key={error}>{error}</li>;
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
