import "./NewRepoButton.css";

export function NewRepoButton({ accessToken, onClick }) {
  return (
    <div className="new-repo-button">
      {accessToken && (
        <button className="create-repo-button" onClick={onClick}>
          New Repo
        </button>
      )}
    </div>
  );
}
