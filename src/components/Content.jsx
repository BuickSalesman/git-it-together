import { RepoCard } from "./RepoCard";
import { NewRepoContainer } from "./NewRepoContainer";
import "./Content.css";

export function Content({ API_URL, accessToken, repos, commits }) {
  return (
    <div className="content">
      <div className="repo-container">
        {repos.map((repo) => {
          const repoCommits = commits.filter((commit) => commit.repo_name === repo.name);

          return <RepoCard API_URL={API_URL} key={repo.id} repo={repo} commits={repoCommits} />;
        })}
        <NewRepoContainer API_URL={API_URL} accessToken={accessToken} />
      </div>
    </div>
  );
}
