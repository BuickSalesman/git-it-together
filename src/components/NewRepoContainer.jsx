import { useState } from "react";
import { NewRepoButton } from "./NewRepoButton";
import { NewRepoModal } from "./NewRepoModal";

export function NewRepoContainer({ accessToken }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {!showModal && <NewRepoButton accessToken={accessToken} onClick={handleOpenModal} />}

      {showModal && <NewRepoModal onClose={handleCloseModal} />}
    </div>
  );
}
