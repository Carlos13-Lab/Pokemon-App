const axios = require('axios');
const express = require('express');
const { Pokemon, Type } = require('../db')
const urlLimit40 = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`
const urlAll = `http://pokeapi.co/api/v2/pokemon/`

const router = express.Router();

// TRAERME SOLO 40 POKES
const getPokeApi = async () => {
    try {
        const PokeArray = [];
        const { data } = await axios.get(urlLimit40)

        for (let i = 0; i < data.results.length; i++) {
            const pokemon = data.results[i].url

            const Todos = await axios.get(pokemon)
            const TodosPokes = {
                id: Todos.data.id,
                name: Todos.data.name,
                img: Todos.data.sprites.other.home.front_default,
                attack: Todos.data.stats[1].base_stat,
                types: Todos.data.types.map((e) => e.type.name),
                strength: Todos.data.stats[1].base_stat
            };
            //   console.log("Lo que me traigo de la api",PokeArray)
            PokeArray.push(TodosPokes)
        };
        return PokeArray;
    } catch (error) {
        console.log(error);
    }
};



// POKE DB
const getPokesDb = async () => {
    try {
        const pokemonDb = await Pokemon.findAll({
            //Busco todos los pokemon de los modelos
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        const findPoke = pokemonDb.map((e) => ({
            id: e.id,
            name: e.name,
            attack: e.attack,
            types: e.types.map((t) => t.name),
            img: e.img,
            createdByUser: e.createdByUser,
            strength: e.strength
        }));
        return findPoke;
    } catch (error) {
        console.log(error)
    }
};


//QUERY
const getApiname = async (name) => {
    try {
        const apiName = await axios.get(`${urlAll}${name}`);
        const names = await apiName.data
        return [{
            id: names.id,
            name: names.name,
            types: names.types.map((t) => t.type.name),
            img: names.sprites.other.home.front_default,
            attack: names.stats[1].base_stat,
            strength: names.data.stats[1].base_stat
        }]
    } catch (error) {
        console.log(error);
    }
};

//QUERY DB
const getPokeNameDb = async (name) => {

    try {
        const dbNames = await Pokemon.findAll({
            where: { name: name },
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });

        const filtroName = dbNames.map((n) => {
            return {
                id: n.id,
                name: n.name,
                types: n.types.map((t) => t.name),
                img: n.img,
                attack: n.attack,
                createdByUser: n.createdByUser,
                strength: n.strength
            };
        });

        return filtroName;
    } catch (error) {
        console.log(error);
    }
};


//RUTA POR QUERY
router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const lowerName = name.toLocaleLowerCase();
            const apiPokeName = await getApiname(lowerName);
            if (!apiPokeName) {
                const dbPokeName = await getPokeNameDb(lowerName);
                if (!dbPokeName) {
                    //console.log(dbPokeName);
                    res.status(404).json({ alert: ('Pokemon not found') });
                } else res.json(dbPokeName);
            } else res.json(apiPokeName)
        } else {
            //union db -api
            const apiPokemon = await getPokeApi();
            const dataBase = await getPokesDb();
            const pokeAll = apiPokemon.concat(dataBase);
            if (dataBase.length > 0) {
                res.json(pokeAll);
            } else res.json(apiPokemon);
        }
    } catch (error) {
        console.log(error)
    }
});

// ID API
const getPokemonIdApi = async (id) => {
    try {
        const apiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const IdDetails = apiId.data;
        return {
            id: IdDetails.id,
            name: IdDetails.name,
            hp: IdDetails.stats[0].base_stat,
            attack: IdDetails.stats[1].base_stat,
            defense: IdDetails.stats[2].base_stat,
            speed: IdDetails.stats[5].base_stat,
            height: IdDetails.height,
            weight: IdDetails.weight,
            types: IdDetails.types.map((t) => t.type.name),
            img: IdDetails.sprites.other.home.front_default,
            strength: IdDetails.stats[1].base_stat
        };
    } catch (error) {
        console.log(error);
    }
};


//ID-DB
const getPokemonIdDb = async (id) => {
    try {
        const findIdDb = await Pokemon.findByPk(id, {
            include: Type,
        });
        return {
            id: findIdDb.id,
            hp: findIdDb.hp,
            name: findIdDb.name,
            attack: findIdDb.attack,
            defense: findIdDb.defense,
            speed: findIdDb.speed,
            strength: findIdDb.strength,
            height: findIdDb.height,
            weight: findIdDb.weight,
            types: findIdDb.types.map((t) => t.name),
            img: findIdDb.img,
            createdByUser: findIdDb.createdByUser,
        };
    } catch (error) {
        console.log(error);
    }
};

// ID API DB
const allPokemoByID = async (id) => {
    try {
        if (id.includes('-')) {
            const dbIdInfo = await getPokemonIdDb(id);
            return dbIdInfo
        } else {
            const apiInfo = await getPokemonIdApi(id);
            return apiInfo;
        }
    } catch (error) {
        console.log(error);
    }
};

//RUTA ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fromApi = await allPokemoByID(id);
        if (fromApi) {
            return res.send(fromApi);
        } else {
            return res.status(404).json({ msg: "Poke Not Found" })
        }
    } catch (error) {
        console.log(error);
    }
});


//POST
router.post("/", async (req, res) => {
    try {
        const {
            name,
            hp,
            img,
            attack,
            defense,
            speed,
            height,
            weight,
            types,
            createdByUser,
            strength
        } = req.body;
        const newPokemon = await Pokemon.create({
            name,
            hp,
            img,
            attack,
            defense,
            strength,
            speed,
            height,
            weight,
            createdByUser,
        });
        const typePokemon = await Type.findAll({
            where: { name: types },
        });

        newPokemon.addType(typePokemon);
        return res.send(newPokemon);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
