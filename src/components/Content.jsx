import { RepoCard } from "./RepoCard";
import { NEwRepoContainer } from "./NewRepoContainer";
import "./Content.css";

export function Content() {
  return (
    <div className="content">
      <div className="repo-container">
        <RepoCard />
        <RepoCard />
        <RepoCard />
        <NEwRepoContainer />
      </div>
    </div>
  );
}
