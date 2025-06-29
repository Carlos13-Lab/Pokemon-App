const PokemonService = require("../services/pokemon.services");

class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
        this.getAllpokemon = this.getAllpokemon.bind(this);
        this.getPokename = this.getPokenameApi.bind(this);
        this.getPokenameDb = this.getPokenameDb.bind(this);
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

    async getPokenameApi(req, res) {
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

    async getPokenameDb(req, res) {
        try {
            const { name } = req.query;
            if (!name) {
                return res.status(400).json({ error: "Name query parameter is required" });
            }
            const pokemonDb = await this.pokemonService.getPokemonByNameDb(name);
            if (!pokemonDb) {
                return res.status(404).json({ alert: "Pokemon not found in database" });
            }
            res.status(200).json(pokemonDb);
        } catch (error) {
            console.error("Error fetching Pokémon by name from database:", error.message);
            res.status(500).json({ error: "Error fetching Pokémon data from database" });
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

    async deletePokemon(req, res) {
        try {
            const { id } = req.params;
            const deletedPoke = await this.pokemonService.deletePoke(id);
            if (!deletedPoke) {
                return res.status(404).json({ error: "Pokémon not found" });
            }
            res.status(200).json({ message: "Pokémon deleted successfully" });
        } catch (error) {
            console.error("Error deleting Pokémon:", error.message);
            res.status(500).json({ error: "Error deleting Pokémon data" });
        }
    }
}

module.exports = PokemonController; 