import { useState, useRef } from "react";
import axios from "axios";

export function LoginDropdown({ onHover, onLeave }) {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const contentRef = useRef();

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    const params = new FormData(event.target);
    axios
      .post("http://localhost:8000/auth/token/", params)
      .then((response) => {
        const accessToken = response.data.access;
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        localStorage.setItem("accessToken", accessToken);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid username or password"]);
      });
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
