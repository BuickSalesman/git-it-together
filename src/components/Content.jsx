import { RepoCard } from "./RepoCard";
import { NewRepoButton } from "./NewRepoButton";
import "./Content.css";

export function Content() {
  return (
    <div className="content">
      <div className="repo-container">
        <RepoCard />
        <RepoCard />
        <RepoCard />
        <NewRepoButton />
      </div>
    </div>
  );
}
