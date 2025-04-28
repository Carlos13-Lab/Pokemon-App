const PokemonService = require("../services/pokemon.services");


class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
        this.getAllpokemon = this.getAllpokemon.bind(this);
    }

    async getAllpokemon(req, res) {
        try {
            const pokeApi = await this.pokemonService.getAllPokes();
            res.status(200).json(pokeApi);
        } catch (error) {
            res.status(500).json({ error: "Error fetching Pokémon data" });
        }
    }

    async getPokename(req, res) {
        try {
            const { name } = req.query;
            if (name) {
                const pokeName = await this.pokemonService.getPokename(name);
                console.log(pokeName);
                if (pokeName.length === 0) {
                    res.status(404).json({ alert: "Pokemon not found" });
                } else {
                    res.status(200).json(pokeName);
                }
            } else {
                const allPokes = await this.pokemonService.getAllPokes();
                res.status(200).json(allPokes);
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching Pokémon data" });
        }
    }
}

module.exports = PokemonController; 