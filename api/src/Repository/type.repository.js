const axios = require("axios");
const { Type } = require("../database/config");

class TypeRepository {
    constructor() {
        this.url = "https://pokeapi.co/api/v2/type";
    }

    // Método para obtener los tipos desde la API y almacenarlos en la base de datos
    async getTypesApi() {
        try {
            const response = await axios.get(this.url);
            const results = response.data.results;

            // Crear o encontrar cada tipo en la base de datos
            for (const type of results) {
                await Type.findOrCreate({
                    where: { name: type.name },
                });
            }

            // Retornar todos los tipos desde la base de datos
            return await Type.findAll();
        } catch (error) {
            console.error("Error al obtener los tipos desde la API:", error.message);
            throw new Error("Error al obtener los tipos desde la API.");
        }
    }
}

module.exports = TypeRepository;