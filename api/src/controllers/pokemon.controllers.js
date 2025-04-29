const PokemonService = require("../services/pokemon.services");


class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
        this.getAllpokemon = this.getAllpokemon.bind(this);
        this.getPokename = this.getPokename.bind(this);
        this.getPokeId = this.getPokeId.bind(this);
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
    async getPokeId(req, res) {
        try {
            const { id } = req.params;
            const pokeId = await this.pokemonService.getPokeId(id);
            if (pokeId.length === 0) {
                res.status(404).json({ alert: "Pokemon not found" });
            } else {
                res.status(200).json(pokeId);
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching Pokémon data" });
        }
    }
}

module.exports = PokemonController; 