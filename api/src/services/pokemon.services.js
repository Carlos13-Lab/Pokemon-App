const PokemonRepository = require("../Repository/Pokemon.repository");


class PokemonService {
    constructor() {
        this.pokemonRepository = new PokemonRepository();
        this.getAllPokes = this.getAllPokes.bind(this);
        this.getPokename = this.getPokename.bind(this);
        this.getPokeId = this.getPokeId.bind(this);
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
    async getPokename(name) {
        try {
            // Buscar en la API y en la base de datos en paralelo
            const [pokeApi, pokemonDb] = await Promise.all([
                this.pokemonRepository.getApiname(name),
                this.pokemonRepository.getPokesDb(name),
            ]);

            // Combinar los resultados
            const allPokes = [pokeApi, pokemonDb].filter(Boolean); // Filtrar valores nulos o undefined

            // Si no se encuentra ningún Pokémon, lanzar un error
            if (allPokes.length === 0) {
                throw new Error(`El Pokémon con el nombre "${name}" no fue encontrado.`);
            }

            return allPokes;
        } catch (error) {
            console.error(`Error en getPokename: ${error.message}`);
            throw new Error(`Error fetching Pokémon data by name: ${error.message}`);
        }
    }

    async getPokeId(id) {
        try {
            // Validar si el ID es numérico o un UUID
            const isNumericId = !isNaN(id); // Verifica si el ID es un número
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id); // Verifica si es un UUID válido

            if (!isNumericId && !isUuid) {
                throw new Error(`El ID "${id}" no es válido. Debe ser un número o un UUID.`);
            }

            // Buscar en la API si el ID es numérico
            const pokeApi = isNumericId ? await this.pokemonRepository.getPokeId(id) : null; // Buscar por pokeApiId si es numérico
            // Buscar en la base de datos
            const pokemonDb = isNumericId
                ? await this.pokemonRepository.getPokeId(id) // Buscar por pokeApiId si es numérico
                : await this.pokemonRepository.getPokeIdDb(id)// Buscar por UUID si no es numérico

            // Si no se encuentra ningún Pokémon, lanzar un error
            if (!pokeApi && !pokemonDb) {
                throw new Error(`El Pokémon con el ID "${id}" no fue encontrado.`);
            }

            return pokeApi || pokemonDb; // Retornar el Pokémon encontrado
        } catch (error) {
            console.error(`Error en getPokeId: ${error.message}`);
            throw new Error(`Error fetching Pokémon data by ID: ${error.message}`);
        }
    }



}

module.exports = PokemonService; 
