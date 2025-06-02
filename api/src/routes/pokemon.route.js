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

route.get("/:id", (req, res, next) => {
    controller.getPokeId(req, res, next); // Llama a getPokeId
});

route.post("/", (req, res, next) => {
    controller.createPokemon(req, res, next); // Llama a createPokemon
});
route.put("/:id", (req, res, next) => {
    controller.updatePokemon(req, res, next); // Llama a updatePokemon
});



module.exports = route;