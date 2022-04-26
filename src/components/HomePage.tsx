import {
  Button,
  Center,
  Heading,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import Instructions from "./Instructions";

interface Props {
  handleStart: () => void;
}

function HomePage({ handleStart }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Instructions isOpen={isOpen} onClose={onClose} />
      <Center>
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Stack
            spacing={6}
            padding={8}
            alignItems="center"
            justifyContent="center"
          >
            <Heading fontSize={{ base: "lg", md: "xl" }}>PokeGuess</Heading>
            <Button
              color="white"
              border="4px"
              borderColor="black"
              fontWeight="normal"
              paddingX={10}
              paddingY={5}
              backgroundColor="blue.400"
              onClick={onOpen}
            >
              How to Play
            </Button>
            <Button
              color="white"
              border="4px"
              borderColor="black"
              fontWeight="normal"
              paddingX={10}
              paddingY={5}
              backgroundColor="blue.400"
              onClick={() => {
                handleStart();
              }}
            >
              Start Game
            </Button>
            <Stack direction="row" justifyContent="space-evenly" width="100%">
              <Link href={"/leaderboard"} passHref={true}>
                <a>
                  <FontAwesomeIcon size="2x" icon={faSquarePollVertical} />
                </a>
              </Link>
              <Link
                href={"https://github.com/Enzo7121/pokeguessNextGen"}
                passHref={true}
              >
                <a target="_blank">
                  <FontAwesomeIcon size="2x" icon={faGithub} />
                </a>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}

export default HomePage;
