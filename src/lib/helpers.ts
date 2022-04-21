import JSConfetti from "js-confetti";
import { Fetcher } from "swr";
import { IUser } from "../types";

export const confetti = () => new JSConfetti().addConfetti();
export const fetcher: Fetcher<IUser[]> = async (...args: any[]) => {
  // @ts-ignore
  const res = await fetch(...args);
  return res.json();
};
