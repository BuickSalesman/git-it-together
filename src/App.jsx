import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const accessToken = localStorage.getItem("accessToken");

  const [allUserRepos, setAllUserRepos] = useState([]);
  const [allUserCommits, setAllUserCommits] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchRepoAndCommitData = async () => {
      try {
        const reposResponse = await axios.get(`${API_URL}/repos/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const fetchedRepos = reposResponse.data.user_repos || [];
        fetchedRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setAllUserRepos(fetchedRepos);

        const commitsResponse = await axios.get(`${API_URL}/commits/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const fetchedCommits = commitsResponse.data.user_commits || [];
        setAllUserCommits(fetchedCommits);
      } catch (error) {
        console.log("Error fetching repos or commits", error);
      }
    };

    const fetchUserName = async () => {
      try {
        const usernameResponse = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const username = usernameResponse.data.user.username || "";
        setUsername(username);
      } catch (error) {
        console.log("Error doing the do", error);
      }
    };

    fetchUserName();
    fetchRepoAndCommitData();

    console.log("API URL being used:", import.meta.env.VITE_API_URL);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header
          API_URL={API_URL}
          username={username}
          accessToken={accessToken}
          repos={allUserRepos}
          commits={allUserCommits}
        />
        <Content API_URL={API_URL} accessToken={accessToken} repos={allUserRepos} commits={allUserCommits} />
      </BrowserRouter>
    </div>
  );
}

export default App;
