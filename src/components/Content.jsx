import { RepoCard } from "./RepoCard";
import { NewRepoContainer } from "./NewRepoContainer";
import "./Content.css";

export function Content({ repos, commits }) {
  return (
    <div className="content">
      <div className="repo-container">
        {repos.map((repo) => {
          const repoCommits = commits.filter((commit) => commit.repo_name === repo.name);

          return <RepoCard key={repo.id} repo={repo} commits={repoCommits} />;
        })}
        <NewRepoContainer />
      </div>
    </div>
  );
}
