import axios from "axios";

const API_URL = "hhttps://pokemon-app-2-9p14.onrender.com/api/";

export const getAllPokemon = async () => {
    const response = await axios.get(`${API_URL}/pokemon`);
    return response.data;
};

export const getPokemonById = async (id) => {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);
    return response.data;
};

export const createPokemon = async (pokemonData) => {
    const response = await axios.post(`${API_URL}/pokemon`, pokemonData);
    return response.data;
};