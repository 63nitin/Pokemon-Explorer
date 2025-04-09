// services/pokeapi.js
import axios from "axios";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 12, offset = 0) => {
  const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return response.data.results;
};

export const fetchPokemonDetails = async (name) => {
  const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${name}`);
  return response.data;
};