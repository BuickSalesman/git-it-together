import "./NewRepoButton.css";

export function NewRepoButton({ onClick }) {
  return (
    <div className="new-repo-button">
      <button className="create-repo-button" onClick={onClick}>
        New Repo
      </button>
    </div>
  );
}
