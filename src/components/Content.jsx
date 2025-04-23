import { RepoCard } from "./RepoCard";
import { NewRepoContainer } from "./NewRepoContainer";
import "./Content.css";

export function Content({ API_URL, accessToken, repos }) {
  return (
    <div className="content">
      <div className="repo-container">
        {repos.map((repo) => {
          return <RepoCard key={repo.id} API_URL={API_URL} accessToken={accessToken} repo={repo} />;
        })}
        <NewRepoContainer API_URL={API_URL} accessToken={accessToken} />
      </div>
    </div>
  );
}
