import { useState } from "react";
import axios from "axios";

export function SingupDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const params = new FormData(event.target);
    const password = params.get("password");
    const passwordConfirmation = params.get("password_confirmation");

    if (password !== passwordConfirmation) {
      setErrors(["Passwords do not match!"]);
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
        console.log(error.response.data.erros);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div
      className="signup-dropdown"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <span className="signup-trigger">Signup</span>

      {showDropdown && (
        <div className="singup-content">
          {errors.length > 0 && (
            <ul>
              {errors.map((error) => {
                <li key={error}>{error}</li>;
              })}
            </ul>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              Username: <input type="text" name="username" />
            </div>
            <div>
              Password: <input type="password" name="password" />
            </div>
            <div>
              Password Confirmation: <input type="password" name="password_confirmation" />
            </div>
            <button type="submit">Signup!</button>
          </form>
        </div>
      )}
    </div>
  );
}
