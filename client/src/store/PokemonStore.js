import { create } from "zustand";
import { persist } from "zustand/middleware";
import ApiService from "../services/services-api"; // Asegúrate de que la ruta sea correcta

const usePokemonStore = create(
    persist((set) => ({
        pokemons: [], // Estado inicial para la lista de Pokémon
        pokemonDetail: null, // Estado para los detalles de un Pokémon específico
        types: [], // Estado para los tipos de Pokémon
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
                if (!data || !data.name) {
                    throw new Error("Pokémon no encontrado");
                }
                set({ pokemonDetail: data, loading: false });
            } catch (error) {
                set({ error: error.message, loading: false });
            }
        },

        fetchTypes: async () => {
            try {
                const response = await ApiService.getTypes();
                const data = response.map((type) => type.name); // Extraer solo los nombres de los tipos
                // Asegurarse de que 'data' sea un array
                if (!Array.isArray(data)) {
                    throw new Error("Datos de tipos no válidos");
                }
                // Actualizar el estado con los tipos obtenidosS
                set({ types: data });
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        },

        // Acción para filtrar Pokémon por tipo
        filterPokemonByType: (type) => {
            set((state) => {
                if (type === "All") {
                    return { filteredPokemons: state.allPokemons }; // Mostrar todos los Pokémon
                }
                const filtered = state.allPokemons.filter((pokemon) =>
                    pokemon.types && pokemon.types.includes(type)
                );
                return { filteredPokemons: filtered }; // Actualizar el estado con los Pokémon filtrados
            });
        },
        // Acción para ordenar Pokémon por nombre
        orderPokemonsByName: (order) => {
            set((state) => {
                const sortedPokemons = [...state.pokemons].sort((a, b) => {
                    if (order === "Desc") {
                        return a.name.localeCompare(b.name); // Orden ascendente
                    } else if (order === "Asc") {
                        return b.name.localeCompare(a.name); // Orden descendente
                    }
                    return 0;
                });
                return { pokemons: sortedPokemons }; // Actualizar el estado con los Pokémon ordenados
            });
        },
        // Acción para ordenar Pokémon por fuerza
        orderPokemonsByStrength: (order) => {
            set((state) => {
                const sortedPokemons = [...state.pokemons].sort((a, b) => {
                    if (order === "Max") {
                        return b.attack - a.attack; // Orden descendente por fuerza (mayor a menor)
                    } else if (order === "Min") {
                        return a.attack - b.attack; // Orden ascendente por fuerza (menor a mayor)
                    }
                    return 0;
                });
                return { pokemons: sortedPokemons }; // Actualizar el estado con los Pokémon ordenados
            });
        },

        fetchPokemonByName: async (name) => {
            set({ loading: true, error: null });
            try {
                // Verificar si el nombre está vacío
                if (!name || name.trim() === "") {
                    set({ loading: false });
                    console.log("No se realizó la búsqueda porque el nombre está vacío.");
                    return null;
                }

                // Realizar la solicitud a la API
                const data = await ApiService.getPokemonByName(name);
                if (!data || !data.name) {
                    throw new Error("Pokémon no encontrado");
                }

                // Actualizar el estado con el resultado
                set({ pokemons: [data], loading: false });
                return data;
            } catch (error) {
                set({ error: error.message, loading: false });
                console.error("Error fetching Pokémon by name:", error);
                return null; // Retornar null si ocurre un error
            }
        },

        fetchPokemonByNameDb: async (name) => {
            set({ loading: true, error: null });
            try {
                const data = await ApiService.getPokemonByNameDb(name);
                if (!data || !data.name) {
                    throw new Error("Pokémon no encontrado en la base de datos");
                }
                set({ pokemons: [data], loading: false }); // Retornar solo el resultado
                return data;
            } catch (error) {
                set({ error: error.message, loading: false });
                console.error("Error fetching Pokémon by name from database:", error);
                return null; // Retornar null si ocurre un error
            }
        }
        ,

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
    }))
    , {
        name: "pokemon-storage", // Nombre del almacenamiento persistente
    }
);

export default usePokemonStore;