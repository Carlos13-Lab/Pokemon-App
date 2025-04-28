const PokemonRepository = require("../Repository/Pokemon.repository"); 


class PokemonService {
    constructor() {
        this.pokemonRepository = new PokemonRepository();
        this.getAllPokes = this.getAllPokes.bind(this);
    }


    async getPokeApi() {
        try {
            const pokeApi = await this.pokemonRepository.getPokeApi();
            return pokeApi;
        } catch (error) {
            throw new Error("Error fetching Pokémon data from the API");
        }
    }
    async getPokesDb() {
        try {
            const pokemonDb = await this.pokemonRepository.getPokesDb();
            return pokemonDb;
        } catch (error) {
            throw new Error("Error fetching Pokémon data from the database");
        }
    }
    async getAllPokes() {
        try {
            const pokeApi = await this.getPokeApi();
            const pokemonDb = await this.getPokesDb();
            const allPokes = [...pokeApi, ...pokemonDb];
            return allPokes;
        } catch (error) {
            throw new Error("Error fetching all Pokémon data");
        }
    }

    async getPokename(name) {
        try {
            const pokeApi = await this.pokemonRepository.getPokeApi();
            const pokemonDb = await this.pokemonRepository.getPokesDb();
            const allPokes = [...pokeApi, ...pokemonDb];
            const pokeName = allPokes.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            console.log(pokeName);
            return pokeName;
        } catch (error) {
            throw new Error("Error fetching Pokémon data by name");
        }
    }
        

    
}

module.exports = PokemonService; 
