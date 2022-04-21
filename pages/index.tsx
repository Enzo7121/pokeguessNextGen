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
} from "@chakra-ui/react";
import { Pokemon } from "../src/types";
import ProgressBar from "../src/components/ProgressBar";
import { usePokemon } from "../src/lib/hooks/usePokemon";
import { inc, TIME_LIMIT } from "../src/lib/constants";
import { useSound } from "../src/lib/hooks/useSound";
import { confetti } from "../src/lib/helpers";
import { useGame } from "../src/lib/hooks/useGame";
import FinishModal from "../src/components/FinishModal";

function App() {
  const [pokemon, { loading, getPokemon }] = usePokemon();
  const { defeatSound, stopSound, victorySound } = useSound();
  const pokemonInput: any = useRef(null);

  const [guessed, setGuessed] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [answered, setAnswered] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [missed, setMissed] = useState<number>(0);
  const [time, setTime] = useState<number>(40);

  const onHandleEnter = (e: any) => {
    if (e.key === "Enter" && !answered && name) {
      handleAnswer();
    } else if (e.key === "Enter" && answered) {
      handleReset();
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setTime(inc);
    }, 1000);
    return () => clearTimeout(interval);
  }, [time]);

  const handleAnswer = () => {
    setAnswered(true);
    const formattedName = name.trim().toLowerCase().replace(/\./g, "");

    if (formattedName === pokemon.name) {
      victorySound();
      setGuessed(inc);
      localStorage.setItem("wins", String(inc(guessed)));
      setWon(true);
      confetti();
      return;
    }
    defeatSound();
    setMissed(inc);
    localStorage.setItem("misses", String(inc(missed)));
  };
  const handleFinish = () => {
    console.log("terminei");
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (time === TIME_LIMIT) {
      handleFinish();
    }
  }, [time]);

  const handleReset = () => {
    stopSound();
    pokemonInput.current.focus();
    setAnswered(false);
    setName("");
    setWon(false);
    getPokemon();
  };

  useEffect(() => {
    setMissed(Number(localStorage.getItem("misses")));
    setGuessed(Number(localStorage.getItem("wins")));
  }, []);

  return (
    <>
      <FinishModal isOpen={time >= TIME_LIMIT} onClose={() => null} />
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
          {/* @ts-ignore */}
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
                    borderColor={!answered ? "black" : won ? "green" : "red"}
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
                  <Stack>
                    <Text>Wins: {guessed}</Text>
                    <Text>Losses: {missed}</Text>
                  </Stack>
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
                        onClick={handleReset}
                      >
                        Volver a jugar
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Center>
        </Box>
      </Flex>
    </>
  );
}

export default App;
