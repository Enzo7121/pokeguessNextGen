import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.leaderboard.findMany();
        res.status(200).json(users);
      } catch (e) {
        return res.status(500).send(e);
      }
    case "POST":
      try {
        const { username, points } = req.body;
        const user = await prisma.leaderboard.create({
          data: {
            username,
            points,
          },
        });
        res.status(200).json(user);
      } catch (e) {
        return res.status(500).send(e);
      }
    default:
      return res.status(405).send(`Method ${method} not allowed`);
  }
}
