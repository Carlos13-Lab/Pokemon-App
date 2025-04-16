const axios = require("axios");
const { Router } = require("express");
const { Type } = require("../database/config");
const url = "https://pokeapi.co/api/v2/type"

const router = Router();

const getTypesApi = async () => {
    try {
        const getApi = await axios.get(url);
        const results = getApi.data.results;
        results.forEach((r) => {
            Type.findOrCreate({
                where: { name: r.name },
            });
        });
        return await Type.findAll();
    } catch (error) {
        console.log(error);
    }
};

router.get("/", async (req, res) => {
    try {
        const typesAll = await getTypesApi();
        res.send(typesAll);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;

