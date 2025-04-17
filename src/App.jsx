import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  const [allUserRepos, setAllUserRepos] = useState([]);
  const [allUserCommits, setAllUserCommits] = useState([]);

  useEffect(() => {
    const fetchRepoAndCommitData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const reposResponse = await axios.get("http://localhost:8000/repos/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const fetchedRepos = reposResponse.data.user_repos || [];
        fetchedRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setAllUserRepos(fetchedRepos);

        const commitsResponse = await axios.get("http://localhost:8000/commits/", {
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

    fetchRepoAndCommitData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header accessToken={accessToken} repos={allUserRepos} commits={allUserCommits} />
        <Content accessToken={accessToken} repos={allUserRepos} commits={allUserCommits} />
      </BrowserRouter>
    </div>
  );
}

export default App;
