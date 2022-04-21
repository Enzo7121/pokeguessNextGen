import { useEffect, useState } from "react";
import { Pokemon } from "../../types";
import pokeApi from "../../services/api";

export const usePokemon = (): [
  Pokemon,
  { loading: boolean; getPokemon: () => Promise<Pokemon> }
] => {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const getPokemon = async () => {
    const res = await pokeApi.random();
    setPokemon(res);
    return res;
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return [pokemon, { loading: !pokemon, getPokemon }];
};
