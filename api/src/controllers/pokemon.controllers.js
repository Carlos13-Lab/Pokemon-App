const PokemonService = require("../services/pokemon.services");


class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
        this.getAllpokemon = this.getAllpokemon.bind(this);
    }

    async getAllpokemon(req, res) {
        try {
            const pokeApi = await this.pokemonService.getPokeApi();
            res.status(200).json(pokeApi);
        } catch (error) {
            res.status(500).json({ error: "Error fetching Pokémon data" });
        }
    }
}

module.exports = PokemonController; 