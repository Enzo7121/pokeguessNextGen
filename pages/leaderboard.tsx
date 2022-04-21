import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Flex,
} from "@chakra-ui/react";
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

  useEffect(() => {
    const formattedUsers = data.map((user: IUser) => ({
      ...user,
      playedAt: formatDate(user.playedAt),
    }));
    if (data) {
      setUsers(formattedUsers);
    }
  }, [data]);

  console.log(users);

  return (
    <Flex margin="auto" width="100vw" height="100vh" justifyContent="center">
      <TableContainer bg="white" width="fit-content" minWidth="800px">
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
              users.map(({ playedAt, points, username }) => (
                <Tr key={+Date.now()}>
                  <Td>{username}</Td>
                  <Td>{points}</Td>
                  <Td>{playedAt}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
