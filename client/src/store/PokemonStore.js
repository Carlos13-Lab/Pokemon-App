import create from "zustand";
import { persist } from "zustand/middleware";
import ApiService from "../services/services-api";

const usePokemonStore = create( 
    persist((set) => ({
    pokemons: [], // Estado inicial para la lista de Pokémon
    selectedPokemon: null, // Estado para el Pokémon seleccionado
    loading: false, // Estado para manejar la carga
    error: null, // Estado para manejar errores

    // Acción para obtener todos los Pokémon
    fetchPokemons: async () => {
        set({ loading: true, error: null });
        try {
            const data = await ApiService.getAllPokemon();
            set({ pokemons: data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Acción para obtener un Pokémon por ID
    fetchPokemonById: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await ApiService.getPokemonById(id);
            set({ selectedPokemon: data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Acción para crear un nuevo Pokémon
    createPokemon: async (pokemonData) => {
        set({ loading: true, error: null });
        try {
            const newPokemon = await ApiService.createPokemon(pokemonData);
            set((state) => ({
                pokemons: [...state.pokemons, newPokemon],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Acción para actualizar un Pokémon
    updatePokemon: async (id, pokemonData) => {
        set({ loading: true, error: null });
        try {
            const updatedPokemon = await ApiService.updatePokemon(id, pokemonData);
            set((state) => ({
                pokemons: state.pokemons.map((pokemon) =>
                    pokemon.id === id ? updatedPokemon : pokemon
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Acción para eliminar un Pokémon
    deletePokemon: async (id) => {
        set({ loading: true, error: null });
        try {
            await ApiService.deletePokemon(id);
            set((state) => ({
                pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
})));

export default usePokemonStore;