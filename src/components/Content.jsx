import { useState, useEffect } from "react";
import { RepoCard } from "./RepoCard";
import { NewRepoContainer } from "./NewRepoContainer";
import "./Content.css";
import axios from "axios";

export function Content() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8000/repos/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        let data = response.data.user_repos;

        data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        setRepos(data);
      } catch (error) {
        console.log("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="content">
      <div className="repo-container">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
        <NewRepoContainer />
      </div>
    </div>
  );
}
