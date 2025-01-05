import { Link } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <header>
      <nav>
        <Link to="/">Home </Link>

        {accessToken ? (
          <LogoutLink />
        ) : (
          <>
            <Signup />
            <Login />
          </>
        )}
      </nav>
    </header>
  );
}
