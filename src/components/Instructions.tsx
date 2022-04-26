import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";

function Instructions({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How To Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <Stack paddingBottom={4}>
                <Heading size="md">Welcome to PokeGuess!</Heading>
              </Stack>
              <Stack spacing={4}>
                <Text letterSpacing={2}>
                  The moment you press the start button, 30 seconds will start
                  running, you must answer as many pokemon names in the shortest
                  possible time to conquer the leaderboard!
                </Text>
                <Text color="gray.500">
                  Remember that you can use the ENTER key to advance faster
                  within the game Good luck!
                </Text>
              </Stack>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              border="2px"
              rounded="lg"
              fontWeight="normal"
              paddingX={10}
              paddingY={5}
              backgroundColor="blue.400"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Instructions;
