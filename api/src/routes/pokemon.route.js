const Router = require("express");
const PokemnonController = require("../controllers/pokemon.controllers");

const controller = new PokemnonController();

const route = Router();

route.get("/", (req, res, next) => {
    const { name } = req.query;
    if (name) {
        controller.getPokename(req, res, next); // Si hay un parámetro "name", llama a getPokename
    } else {
        controller.getAllpokemon(req, res, next); // Si no hay "name", llama a getAllpokemon
    }
});

module.exports = route;