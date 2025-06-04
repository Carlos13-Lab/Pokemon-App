const TypeService = require("../services/types.services");

class TypeController {
    constructor() {
        this.typeService = new TypeService();
        this.getAllTypes = this.getAllTypes.bind(this);
        this.populateTypes = this.populateTypes.bind(this);
    }

    // Endpoint para obtener todos los tipos
    async getAllTypes(req, res) {
        try {
            const types = await this.typeService.getAllTypes();
            res.status(200).json(types);
        } catch (error) {
            console.error("Error al obtener los tipos:", error.message);
            res.status(500).json({ error: "Error al obtener los tipos." });
        }
    }

    // Endpoint para poblar los tipos desde la API
    async populateTypes(req, res) {
        try {
            const types = await this.typeService.populateTypes();
            res.status(200).json({ message: "Tipos poblados exitosamente.", types });
        } catch (error) {
            console.error("Error al poblar los tipos:", error.message);
            res.status(500).json({ error: "Error al poblar los tipos." });
        }
    }
}

module.exports = TypeController;