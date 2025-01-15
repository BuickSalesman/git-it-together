import { Link } from "react-router-dom";
import { LoginDropdown } from "./LoginDropdown";
import { SingupDropdown } from "./SignupDropdown";
import { LogoutLink } from "./LogoutLink";
import { useState, useRef } from "react";

export function Header() {
  const accessToken = localStorage.getItem("accessToken");

  const [bgCoords, setBgCoords] = useState({ width: 0, height: 0, top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState(false);

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
    <header>
      <nav className="navbar">
        <div className={`dropdownBackground ${isOpen ? "open" : ""}`} style={backgroundStyle} ref={backgroundRef}>
          <span className="arrow"></span>
        </div>

        <div className="nav-right">
          {accessToken ? (
            <>
              <Link to="/">Home</Link>
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
              />
              <LoginDropdown
                onHover={(contentEl) => {
                  moveBackground(contentEl);
                  setIsOpen(true);
                }}
                onLeave={() => {
                  setIsOpen(false);
                }}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
