import { useState } from "react";
import { NewRepoButton } from "./NewRepoButton";
import { NewRepoModal } from "./NewRepoModal";

export function NewRepoContainer() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <NewRepoButton onClick={handleOpenModal} />
      {showModal && <NewRepoModal onClose={handleCloseModal} />}
    </div>
  );
}
