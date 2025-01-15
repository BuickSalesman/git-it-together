import { RepoCard } from "./RepoCard";
import { NewRepoButton } from "./NewRepoButton";

export function Content() {
  return (
    <div className="content">
      <h1>git-it-together</h1>
      <div>
        <RepoCard />
        <RepoCard />
        <RepoCard />
        <NewRepoButton />
      </div>
    </div>
  );
}
