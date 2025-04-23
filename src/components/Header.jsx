import { LoginDropdown } from "./LoginDropdown";
import { SingupDropdown } from "./SignupDropdown";
import { LogoutLink } from "./LogoutLink";
import { useState, useRef } from "react";
import { useAuth } from "../AuthContext";
import "./Header.css";

export function Header({ API_URL, username, repos, commits }) {
  const [bgCoords, setBgCoords] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const { access, logout } = useAuth();

  const backgroundRef = useRef();

  const moveBackground = (dropdownElement) => {
    if (!dropdownElement) return;
    const dropdownRect = dropdownElement.getBoundingClientRect();
    const navRect = document.querySelector(".navbar").getBoundingClientRect();

    const width = dropdownRect.width;
    const height = dropdownRect.height;
    const top = dropdownRect.top - navRect.top;
    const left = dropdownRect.left - navRect.left;

    setBgCoords({ width, height, top, left });
  };

  const backgroundStyle = {
    width: bgCoords.width,
    height: bgCoords.height,
    transform: `translate(${bgCoords.left}px, ${bgCoords.top}px)`,
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className={`dropdownBackground ${isOpen ? "open" : ""}`} style={backgroundStyle} ref={backgroundRef}></div>

        <div className="nav-left">{access ? <>{username}</> : <>git it together</>}</div>

        <div className="nav-center">{access ? <>searchbar</> : <></>}</div>

        <div className="nav-right">
          {access ? (
            <>
              <LogoutLink />
            </>
          ) : (
            <>
              <SingupDropdown
                onHover={(contentEl) => {
                  moveBackground(contentEl);
                  setIsOpen(true);
                }}
                onLeave={() => {
                  setIsOpen(false);
                }}
                API_URL={API_URL}
              />
              <LoginDropdown
                onHover={(contentEl) => {
                  moveBackground(contentEl);
                  setIsOpen(true);
                }}
                onLeave={() => {
                  setIsOpen(false);
                }}
                API_URL={API_URL}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
