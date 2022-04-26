import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const FinishModal = ({
  isOpen,
  onClose,
  points = 0,
}: {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}) => {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username) {
      fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          points,
        }),
      });
      router.push("/leaderboard");
    }
    e.stopPropagation();
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You have won {points} points</ModalHeader>
        <ModalBody>
          <Input
            value={username}
            placeholder="Your name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FinishModal;
