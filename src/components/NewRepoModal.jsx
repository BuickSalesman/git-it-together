export function NewRepoModal() {
  <div id="new-repo-form-container">
    <form action="" id="new-repo-form">
      <div>
        Name: <input type="text" name="name" />
      </div>
      <div>
        Notes Enabled:
        <input type="hidden" name="notes_enabled" value="false" />
        <input type="checkbox" name="notes_enabled" value="true" />
      </div>
    </form>
  </div>;
}
