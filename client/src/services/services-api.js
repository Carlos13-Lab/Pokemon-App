import axios from "axios";
 const API_URL = "https://pokemon-app-2-9p14.onrender.com/api";
//nst API_URL= "http://localhost:5000/api"; // Local development URL

export const getAllPokemon = async () => {
    const response = await axios.get(`${API_URL}/pokemon`);
    return response.data;
};

export const getPokemonById = async (id) => {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);
    return response.data;
};
export const getPokemonByName = async (name) => {
    const response = await axios.get(`${API_URL}/pokemon/name?name=${name}`);
    return response.data;
};

export const getPokemonByNameDb = async (name) => {
    const response = await axios.get(`${API_URL}/pokemon/db/name?name=${name}`);
    return response.data;
};

export const getTypes = async () => {
    const response = await axios.get(`${API_URL}/types`);
    return response.data;
};

export const createPokemon = async (pokemonData) => {
    const response = await axios.post(`${API_URL}/pokemon`, pokemonData);
    return response.data;
};


export const updatePokemon = async (id, pokemonData) => {
    const response = await axios.put(`${API_URL}/pokemon/${id}`, pokemonData);
    return response.data;
}

export const deletePokemon = async (id) => {
    const response = await axios.delete(`${API_URL}/pokemon/${id}`);
    return response.data;
}

const services = {
    getAllPokemon,
    getPokemonById,
    createPokemon,
    updatePokemon,
    getPokemonByName,
    getPokemonByNameDb,
    deletePokemon,
    getTypes
};

export default services;