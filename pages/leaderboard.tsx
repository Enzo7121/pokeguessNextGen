import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { fetcher } from "../src/lib/helpers";
import { IUser } from "../src/types";

const formatDate = (date: string) =>
  Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

export default function Leaderboard() {
  const { data = [] as IUser[] } = useSWR("/api/leaderboard", fetcher);
  const [users, setUsers] = useState<IUser[]>([]);

  const router = useRouter();

  useEffect(() => {
    const formattedUsers = data.map((user: IUser) => ({
      ...user,
      playedAt: formatDate(user.playedAt),
    }));
    if (data) {
      setUsers(formattedUsers);
    }
  }, [data]);

  return (
    <Flex>
      <Flex margin="auto" width="100vw" height="100vh" justifyContent="center">
        <Stack
          position="absolute"
          top="2"
          left="2"
          backgroundColor="white"
          rounded="lg"
          onClick={() => router.push("/")}
        >
          <Button
            color="white"
            border="2px"
            rounded="lg"
            fontWeight="normal"
            paddingX={10}
            paddingY={5}
            backgroundColor="blue.400"
          >
            Home
          </Button>
        </Stack>
        <TableContainer
          rounded="lg"
          maxWidth="100%"
          margin="auto"
          bg="white"
          width="fit-content"
          overflowX={"auto"}
        >
          <Table variant="simple">
            <TableCaption>Pokemon Leaderboard</TableCaption>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Points</Th>
                <Th>Played At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                [...users]
                  .sort((a, b) => b.points - a.points)
                  .map(({ playedAt, points, username, id }) => (
                    <Tr key={id}>
                      <Td>{username}</Td>
                      <Td>{points}</Td>
                      <Td>{playedAt}</Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
}
