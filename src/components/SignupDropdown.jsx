import { useState, useRef } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

export function SingupDropdown({ API_URL, onHover, onLeave }) {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const contentRef = useRef();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);

    const form = new FormData(event.target);
    const username = form.get("username");
    const password = form.get("password");
    const passwordConfirmation = form.get("password_confirmation");

    if (password !== passwordConfirmation) {
      setErrors(["Passwords do not match!"]);
      return;
    }

    try {
      await axios.post(`${API_URL}/users/create/`, form);
      await login({ username, password });
      event.target.reset();
    } catch (err) {
      setErrors(err.response?.data?.errors || ["Signup failed!"]);
    }
  };

  return (
    <div
      className={`signup-dropdown ${show ? "show-dropdown" : ""}`}
      onMouseEnter={() => {
        setShow(true);
        onHover?.(contentRef.current);
      }}
      onMouseLeave={() => {
        setShow(false);
        onLeave?.();
      }}
    >
      <span className="signup-trigger">Signup</span>

      {show && (
        <div className="singup-content" ref={contentRef}>
          {errors && errors.length > 0 && (
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
