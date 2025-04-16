const Router = require("express");
const PokemnonController = require("../controllers/pokemon.controllers");

const controller = new PokemnonController();

const route = Router();


route.get("/", controller.getAllpokemon);

module.exports = route;