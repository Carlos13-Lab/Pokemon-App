const PokemonService = require("../services/pokemon.services");

class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
        this.getAllpokemon = this.getAllpokemon.bind(this);
        this.getPokename = this.getPokename.bind(this);
        this.getPokeId = this.getPokeId.bind(this);
        this.createPokemon = this.createPokemon.bind(this);
        this.updatePokemon = this.updatePokemon.bind(this);
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
            if (!name) {
                return res.status(400).json({ error: "Name query parameter is required" });
            }
            const pokemon = await this.pokemonService.getPokemonByName(name);
            if (!pokemon) {
                return res.status(404).json({ alert: "Pokemon not found" });
            }
            res.status(200).json(pokemon);

    
        }
        catch (error) {
            console.error("Error fetching Pokémon by name:", error.message);
            res.status(500).json({ error: "Error fetching Pokémon data by name" });
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

    async createPokemon(req, res) {
        try {
            const { name, hp, img, attack, defense, speed, height, weight, types, createdByUser, strength } = req.body;

            const pokeCreate = await this.pokemonService.createPoke({
                name,
                hp,
                img,
                attack,
                defense,
                speed,
                height,
                weight,
                types, 
                createdByUser,
                strength,
            });

            

            if (!pokeCreate) {
                return res.status(400).json({ error: "Error creando el Pokémon." });
            }

            res.status(201).json(pokeCreate);
        } catch (error) {
            console.error("Error creando el Pokémon:", error.message);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }

    async updatePokemon(req, res) {
        try {
            const { id } = req.params;
            const pokeUpdate = await this.pokemonService.updatePoke(id, req.body);
            if (!pokeUpdate) {
                return res.status(404).json({ error: "Pokémon not found" });
            }
            res.status(200).json(pokeUpdate);
        } catch (error) {
            console.error("Error updating Pokémon:", error.message);
            res.status(500).json({ error: "Error updating Pokémon data" });
        }
    }
}

module.exports = PokemonController; 