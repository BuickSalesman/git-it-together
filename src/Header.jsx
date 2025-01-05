import { Link } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home </Link>
        <Signup />
        <Login />
        <LogoutLink />
      </nav>
    </header>
  );
}
