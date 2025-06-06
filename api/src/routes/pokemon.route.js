const Router = require("express");
const PokemnonController = require("../controllers/pokemon.controllers");

const controller = new PokemnonController();

const route = Router();

route.get("/name", (req, res, next) => {
    controller.getPokenameApi(req, res, next); // Llama a getPokename
});
route.get("/", (req, res, next) => {
    controller.getAllpokemon(req, res, next); // Llama a getAllpokemon
});
route.get("/db/name", (req, res, next) => {
    controller.getPokenameDb(req, res, next); // Llama a getPokenameDb
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
route.delete("/:id", (req, res, next) => {
    controller.deletePokemon(req, res, next); // Llama a deletePokemon
});



module.exports = route;