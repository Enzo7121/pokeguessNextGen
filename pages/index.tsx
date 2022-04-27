import { useState, useEffect, useRef } from "react";
import {
  Center,
  Stack,
  Text,
  Image,
  Input,
  Button,
  Heading,
  Flex,
  Spinner,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import ProgressBar from "../src/components/ProgressBar";
import { usePokemon } from "../src/lib/hooks/usePokemon";
import { inc, TIME_LIMIT } from "../src/lib/constants";
import { useSound } from "../src/lib/hooks/useSound";
import { confetti } from "../src/lib/helpers";
import FinishModal from "../src/components/FinishModal";
import HomePage from "../src/components/HomePage";

function App() {
  const [pokemon, { loading, getPokemon }] = usePokemon();
  const { defeatSound, stopSound, victorySound, finishSound } = useSound();
  const pokemonInput: any = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [start, setStart] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [answered, setAnswered] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    if (!start) return;
    if (time <= TIME_LIMIT) {
      const interval = setTimeout(() => {
        setTime(inc);
      }, 1000);
      return () => clearTimeout(interval);
    } else {
      handleFinish();
    }
  }, [start, time]);

  const handleAnswer = () => {
    setAnswered(true);
    const formattedName = name.trim().toLowerCase().replace(/\./g, "");

    if (formattedName === pokemon.name) {
      victorySound();
      setPoints((prev: number) => prev + 10);
      return;
    }
    defeatSound();
  };
  const handleFinish = () => {
    finishSound();
    confetti();
    onOpen();
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const handleNext = () => {
    stopSound();
    pokemonInput.current.focus();
    setAnswered(false);
    setName("");
    getPokemon();
  };

  const onHandleEnter = (e: any) => {
    if (e.key === "Enter" && !answered && name) {
      handleAnswer();
    } else if (e.key === "Enter" && answered) {
      handleNext();
    }
  };

  return (
    <>
      <FinishModal isOpen={isOpen} onClose={onClose} points={points} />
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        height="100vh"
        width="100vw"
      >
        <Box
          boxShadow="lg"
          padding={6}
          margin="auto"
          backgroundColor="white"
          maxW="500px"
          rounded="20px"
        >
          {start ? (
            <>
              <ProgressBar percentage={time * 3.3333} />
              <Center justifyContent="center" alignItems="center">
                <Stack
                  width="100%"
                  justifyContent="center"
                  textAlign="center"
                  marginTop={{ base: "1rem", md: "2rem", lg: "2rem" }}
                >
                  {answered ? (
                    <Stack>
                      <Heading fontSize={{ base: "lg", md: "xl" }}>
                        The Pokemon is {pokemon.name}
                      </Heading>
                    </Stack>
                  ) : (
                    <Heading fontSize={{ base: "lg", md: "xl" }}>
                      Who is this Pokemon?
                    </Heading>
                  )}
                  <Stack alignItems="center">
                    {loading ? (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                    ) : (
                      <Image
                        boxSize={{ base: "300px", lg: "400px", xl: "450px" }}
                        filter="auto"
                        transition="all 0.5s ease-out"
                        objectFit="cover"
                        maxWidth={{ base: "400px", md: "600px" }}
                        brightness={answered ? "100%" : "0%"}
                        src={pokemon.image}
                        alt="pokemon"
                      />
                    )}
                    <Stack direction="column">
                      <Input
                        autoFocus={true}
                        value={name}
                        border="4px"
                        borderColor="black"
                        padding={5}
                        placeholder="Pokemon name..."
                        ref={pokemonInput}
                        onKeyDown={onHandleEnter}
                        onChange={handleChange}
                      />
                      <Button
                        border="4px"
                        borderColor="black"
                        backgroundColor="blue.400"
                        color="white"
                        fontWeight="normal"
                        paddingX={10}
                        paddingY={5}
                        isDisabled={loading || answered || !name}
                        onClick={handleAnswer}
                      >
                        Guess
                      </Button>
                    </Stack>
                    <Stack direction="column" alignItems="center" fontSize="xl">
                      {answered && (
                        <Stack>
                          <Button
                            color="white"
                            border="4px"
                            borderColor="black"
                            fontWeight="normal"
                            paddingX={10}
                            paddingY={5}
                            backgroundColor="blue.400"
                            onClick={handleNext}
                          >
                            Next Pokemon
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Center>
            </>
          ) : (
            <HomePage handleStart={() => setStart(true)} />
          )}
        </Box>
      </Flex>
    </>
  );
}

export default App;
