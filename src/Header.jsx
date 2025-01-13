import { Link } from "react-router-dom";
import { LoginDropdown } from "./LoginDropdown";
import { SingupDropdown } from "./SignupDropdown";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <header>
      <nav className="navbar">
        <div className="nav-right">
          {" "}
          {accessToken ? (
            <>
              <Link to="/">Home</Link>
              <> </>
              <LogoutLink />
            </>
          ) : (
            <>
              <SingupDropdown />
              <LoginDropdown />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
