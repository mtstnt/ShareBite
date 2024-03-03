import { Button } from "flowbite-react";
import { useState } from "react";
import Modal, { ModalProps } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isJoinModalOpened, setJoinModalOpened] = useState(false);

  function handleShowJoinModal() {
    setJoinModalOpened(true);
  }

  function handleShowCreateForm() {
    navigate("/create");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3 overflow-hidden">
      <h1 className="mb-5 text-5xl font-bold text-white">ShareBite</h1>
      <Button
        className="w-6/12"
        color="blue"
        onClick={handleShowCreateForm}
      >
        Create New
      </Button>
      <Button
        className="w-6/12"
        color="blue"
        onClick={handleShowJoinModal}
      >
        Join Existing
      </Button>

      <JoinModal
        classNames={{
          modal: "rounded",
        }}
        open={isJoinModalOpened}
        onClose={() => setJoinModalOpened(false)}
      />
    </div>
  );
}

function JoinModal(props: ModalProps & React.RefAttributes<HTMLDivElement>) {
  return (
    <Modal {...props} center>
      <div className="p-5">
        <h2>Big Modal WOWOO</h2>
      </div>
    </Modal>
  );
}
