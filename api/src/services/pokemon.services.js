const PokemonRepository = require("../Repository/Pokemon.repository");


class PokemonService {
    constructor() {
        this.pokemonRepository = new PokemonRepository();
        this.getAllPokes = this.getAllPokes.bind(this);
        this.getPokeId = this.getPokeId.bind(this);
        this.createPoke = this.createPoke.bind(this);
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
            const pokemon = await this.pokemonRepository.getPokemonNameDbOrApi(name);
            return pokemon;
        } catch (error) {
            console.error(`Error en getPokemonByName: ${error.message}`);
            throw new Error(`Error fetching Pokémon by name: ${error.message}`);
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

}

module.exports = PokemonService; 
