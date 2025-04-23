import { useState, useRef } from "react";
import { useAuth } from "../AuthContext";

export function LoginDropdown({ onHover, onLeave }) {
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

    try {
      await login({ username, password });
      event.target.reset();
    } catch {
      setErrors(["Invalid username of password"]);
    }
  };

  return (
    <div
      className={`login-dropdown ${show ? "show-dropdown" : ""}`}
      onMouseEnter={() => {
        setShow(true);
        onHover?.(contentRef.current);
      }}
      onMouseLeave={() => {
        setShow(false);
        onLeave?.();
      }}
    >
      <span className="login-trigger">Login</span>

      {show && (
        <div className="login-content" ref={contentRef}>
          {errors.length > 0 && (
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              Username: <input name="username" type="text" />
            </div>
            <div>
              Password: <input name="password" type="password" />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}
