import { Link } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home </Link>
        <Signup />
        <Login />
      </nav>
    </header>
  );
}
