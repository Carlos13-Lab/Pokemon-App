const PokemonRepository = require("../Repository/pokemon.repository.js");


class PokemonService {
    constructor() {
        this.pokemonRepository = new PokemonRepository();
        this.getAllPokes = this.getAllPokes.bind(this);
        this.getPokeId = this.getPokeId.bind(this);
        this.createPoke = this.createPoke.bind(this);
        this.updatePoke = this.updatePoke.bind(this);
        this.deletePoke = this.deletePoke.bind(this);
    }   

    async getAllPokes() {
        try {
            const pokeApi = await this.pokemonRepository.getPokeApi();
            const pokemonDb = await this.pokemonRepository.getPokesDb();
            const allPokes = [...pokeApi, ...pokemonDb];
            return allPokes;
        } catch (error) {
            throw new Error("Error fetching all Pokémon data");
        }
    }
    

    async getPokemonByName(name) {
        try {
            const pokemon = await this.pokemonRepository.getPokemonByName(name);
            return pokemon;
        } catch (error) {
            console.error(`Error en getPokemonByName: ${error.message}`);
            throw new Error(`Error fetching Pokémon by name: ${error.message}`);
        }   
    }

    async getPokemonByNameDb(name) {
        try {
            const pokemonDb = await this.pokemonRepository.getPokemonByNameDb(name);
            if (!pokemonDb) {
                throw new Error("Pokémon not found in database");
            }
            return pokemonDb;
        } catch (error) {
            console.error(`Error en getPokemonByNameDb: ${error.message}`);
            throw new Error(`Error fetching Pokémon by name from database: ${error.message}`);
        }
    }
    
    async getPokeId(id) {
        try {
            const pokeId = await this.pokemonRepository.getPokeIdApiOrDb(id);
            if (pokeId.length === 0) {
                throw new Error("Pokémon not found");
            }
            return pokeId;
        } catch (error) {
            console.error(`Error en getPokeId: ${error.message}`);
            throw new Error(`Error fetching Pokémon data by ID: ${error.message}`);
        }
    }

    async createPoke(poke) {
        try {
            const newPoke = await this.pokemonRepository.createPoke(poke);
            console.log("Nuevo Pokémon creado:", newPoke);
            return newPoke;
        } catch (error) {
            console.error(`Error en createPoke: ${error.message}`);
            throw new Error(`Error creating Pokémon: ${error.message}`);
        }
    }

    async updatePoke(id, poke) {
        try {
            const updatedPoke = await this.pokemonRepository.updatePoke(id, poke);
            console.log("Pokémon actualizado:", updatedPoke);
            return updatedPoke;
        } catch (error) {
            console.error(`Error en updatePoke: ${error.message}`);
            throw new Error(`Error updating Pokémon: ${error.message}`);
        }
    }

    async deletePoke(id) {
        try {
            const deletedPoke = await this.pokemonRepository.deletePoke(id);
            console.log("Pokémon eliminado:", deletedPoke);
            return deletedPoke;
        } catch (error) {
            console.error(`Error en deletePoke: ${error.message}`);
            throw new Error(`Error deleting Pokémon: ${error.message}`);
        }
    }
}

module.exports = PokemonService; 
