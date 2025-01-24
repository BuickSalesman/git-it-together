import { useState, useEffect } from "react";
import { RepoCard } from "./RepoCard";
import { NewRepoContainer } from "./NewRepoContainer";
import "./Content.css";
import axios from "axios";

export function Content() {
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
    <div className="content">
      <div className="repo-container">
        {allUserRepos.map((repo) => {
          const repoCommits = allUserCommits.filter((commit) => commit.repo_name === repo.name);

          return <RepoCard key={repo.id} repo={repo} commits={repoCommits} />;
        })}
        <NewRepoContainer />
      </div>
    </div>
  );
}
