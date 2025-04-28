const Router = require("express");
const PokemnonController = require("../controllers/pokemon.controllers");

const controller = new PokemnonController();

const route = Router();

route.get("/name", (req, res, next) => {
    controller.getPokename(req, res, next); // Llama a getPokename
}); // Llama a getPokename

route.get("/", (req, res, next) => {
    controller.getAllpokemon(req, res, next); // Llama a getAllpokemon
}); 



module.exports = route;