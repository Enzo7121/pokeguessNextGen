import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../lib/helpers";

const FinishModal = ({
  isOpen,
  onClose,
  points = 0,
}: {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}) => {
  const [username, setUsername] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        points,
      }),
    });
    e.stopPropagation();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your earned {points} points</ModalHeader>
        <ModalCloseButton />
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
