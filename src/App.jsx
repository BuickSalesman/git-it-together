import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { access, logout } = useAuth();
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!access) return;
    const authHeader = { headers: { Authorization: `Bearer ${access}` } };

    Promise.all([
      axios.get(`${API_URL}/users/me/`, authHeader),
      axios.get(`${API_URL}/repos/`, authHeader),
      axios.get(`${API_URL}/commits/`, authHeader),
    ])
      .then(([uName, repo, commit]) => {
        setUsername(uName.data.user.username);
        const sorted = (repo.data.user_repos || []).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(sorted);
        setCommits(commit.data.user_commits || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [access]);

  return (
    <div>
      <BrowserRouter>
        <Header API_URL={API_URL} onLogout={logout} username={username} repos={repos} commits={commits} />
        <Content API_URL={API_URL} repos={repos} commits={commits} />
      </BrowserRouter>
    </div>
  );
}

export default App;
