import { useAuth } from "../AuthContext";

export function LogoutLink() {
  const { logout } = useAuth();
  const handleClick = (e) => {
    e.preventDefault();
    logout();
    window.location.reload();
  };

  return (
    <a href="#" onClick={handleClick}>
      Logout
    </a>
  );
}
