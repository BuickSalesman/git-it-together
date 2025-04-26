import { useState } from "react";
import { NewRepoButton } from "./NewRepoButton";
import { NewRepoModal } from "./NewRepoModal";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function NewRepoContainer({ API_URL }) {
  const [showModal, setShowModal] = useState(false);
  const qc = useQueryClient();

  const createRepoMutation = useMutation({
    mutationFn: ({ name, notes_enabled }) =>
      axios.post(`${API_URL}/repos/create/`, { name, notes_enabled }).then((res) => res.data),
    onMutate: async ({ name, notes_enabled }) => {
      await qc.cancelQueries(["repos"]);
      await qc.cancelQueries(["commits"]);

      const prevRepos = qc.getQueryData(["repos"]) || [];
      const prevCommits = qc.getQueryData(["commits"]) || [];

      const tempRepoId = `temp-repo-${Date.now()}`;
      const now = new Date().toISOString();
      const tempRepo = {
        id: tempRepoId,
        name,
        notes_enabled: notes_enabled,
        created_at: now,
        updated_at: now,
      };
      qc.setQueryData(["repos"], (old) => [tempRepo, ...old]);

      const tempCommitId = `temp-commit-${Date.now()}`;
      const tempCommit = {
        id: tempCommitId,
        repo_name: name,
        note_title: null,
        note_body: null,
        created_at: now,
      };
      qc.setQueryData(["commits"], (old) => [...old, tempCommit]);

      return { prevRepos, prevCommits, tempRepoId, tempCommitId };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(["repos"], ctx.prevRepos);
      qc.setQueryData(["commits"], ctx.prevCommits);
    },
    onSuccess: (data, _vars, ctx) => {
      const realRepo = {
        id: data.repo_id,
        name: data.name,
        notes_enabled: data.notes_enabled,
        created_at: data.created_at,
        updated_at: data.created_at,
      };

      qc.setQueryData(["repos"], (old) => old.map((r) => (r.id === ctx.tempRepoId ? realRepo : r)));

      qc.invalidateQueries(["commits"]);
    },
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = ({ name, notes_enabled }) => {
    createRepoMutation.mutate({ name, notes_enabled });
    console.log(notes_enabled);
    setShowModal(false);
  };

  return (
    <div>
      {!showModal && <NewRepoButton onClick={handleOpenModal} loading={createRepoMutation.isLoading} />}

      {showModal && <NewRepoModal onClose={handleCloseModal} onSubmit={handleSubmit} />}
    </div>
  );
}
