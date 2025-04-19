import { useState } from "react";
import { NewRepoButton } from "./NewRepoButton";
import { NewRepoModal } from "./NewRepoModal";

export function NewRepoContainer({ API_URL, accessToken }) {
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

      {showModal && <NewRepoModal onClose={handleCloseModal} API_URL={API_URL} />}
    </div>
  );
}
