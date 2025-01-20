import { RepoCard } from "./RepoCard";
import { NewRepoContainer } from "./NewRepoContainer";
import "./Content.css";

export function Content() {
  return (
    <div className="content">
      <div className="repo-container">
        <RepoCard />
        <RepoCard />
        <RepoCard />
        <NewRepoContainer />
      </div>
    </div>
  );
}
