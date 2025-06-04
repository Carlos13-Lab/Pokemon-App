
const TypeRepository = require("../Repository/type.repository");

class TypeService {
    constructor() {
        this.typeRepository = new TypeRepository();
        this.getAllTypes = this.getAllTypes.bind(this);
        this.populateTypes = this.populateTypes.bind(this);
    }

    // Obtener todos los tipos desde la base de datos
    async getAllTypes() {
        try {
            const types = await this.typeRepository.getTypesApi();
            return types;
        } catch (error) {
            console.error("Error al obtener los tipos:", error.message);
            throw new Error("Error al obtener los tipos.");
        }
    }

    // Poblar la base de datos con los tipos desde la API
    async populateTypes() {
        try {
            const types = await this.typeRepository.getTypesApi();
            console.log("Tipos poblados exitosamente.");
            return types;
        } catch (error) {
            console.error("Error al poblar los tipos:", error.message);
            throw new Error("Error al poblar los tipos.");
        }
    }
}

module.exports = TypeService;