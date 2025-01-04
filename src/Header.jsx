import { Link } from "react-router-dom";
import { Signup } from "./Signup";

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home </Link>
        <Signup />
        {localStorage.jwt === undefined ? (
          <>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
}
