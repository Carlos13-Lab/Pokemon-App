const { Router } = require("express");
const TypeController = require("../controllers/type.controllers.js");

const router = Router();
const typeController = new TypeController();

router.get("/", typeController.getAllTypes); // Endpoint para obtener todos los tipos
router.post("/populate", typeController.populateTypes); // Endpoint para poblar los tipos desde la API

module.exports = router;