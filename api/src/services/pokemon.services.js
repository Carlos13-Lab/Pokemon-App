const PokemonRepository = require("../Repository/Pokemon.repository"); 


class PokemonService {
    constructor() {
        this.pokemonRepository = new PokemonRepository();
        this.getPokeApi = this.getPokeApi.bind(this);
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
}

module.exports = PokemonService;
