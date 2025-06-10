const express = require('express');
const { Pokemon, Type } = require('../database/config')
const urlLimit40 = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=100` // Cambiado a 1000 para obtener más Pokémon
const urlAll = `http://pokeapi.co/api/v2/pokemon/`
const axios = require('axios');
const { Op } = require("sequelize");

class PokemonRepository {
    constructor() {
        this.urlLimit40 = urlLimit40;
        this.urlAll = urlAll;
        this.getPokeApi = this.getPokeApi.bind(this);
        this.getPokesDb = this.getPokesDb.bind(this);
        this.getPokeId = this.getPokeId.bind(this);
        this.getPokeIdApiOrDb = this.getPokeIdApiOrDb.bind(this);
        this.populateTypesOnce = this.populateTypesOnce.bind(this);
        this.updatePoke = this.updatePoke.bind(this);
        this.deletePoke = this.deletePoke.bind(this);
        this.getPokemonByName   = this.getPokemonByName.bind(this);
        this.getPokemonByNameDb = this.getPokemonByNameDb.bind(this);
    }
    async populateTypesOnce() {
        try {
            // Verificar si la tabla `Type` ya tiene datos
            const existingTypes = await Type.findAll();
            if (existingTypes.length > 0) {
                console.log("La base de datos ya contiene tipos. No es necesario popularla nuevamente.");
                return;
            }

            // Hacer la petición a la API para obtener los tipos
            const { data } = await axios.get("https://pokeapi.co/api/v2/type");
            console.log("Obteniendo tipos de la API...", data);

            // Extraer los nombres de los tipos
            const types = data.results.map((type) => ({ name: type.name }));

            // Insertar los tipos en la base de datos
            await Type.bulkCreate(types);

            console.log("Base de datos poblada exitosamente con los tipos de la API.");
        } catch (error) {
            console.error("Error al poblar los tipos desde la API:", error.message);
            throw new Error("Error al poblar los tipos desde la API.");
        }
    }
    async getPokeApi() {
        try {
            const { data } = await axios.get(this.urlLimit40);

            const PokeArray = await Promise.all(
                data.results.map(async (pokemon) => {
                    try {
                        const { data: Todos } = await axios.get(pokemon.url);
                        return {
                            id: Todos.id,
                            name: Todos.name,
                            img: Todos.sprites.other.home.front_default,
                            attack: Todos.stats[1].base_stat,
                            hp: Todos.stats[0].base_stat, // Agregar HP
                            defense: Todos.stats[2].base_stat, // Agregar Defensa
                            speed: Todos.stats[5].base_stat, // Agregar Velocidad

                            types: Todos.types.map((e) => e.type.name),
                            strength: Todos.strength || 0, // Asignar un valor por defecto si no existe
                            createdByUser: false // Asumimos que los Pokémon de la API no son creados por usuarios
                        };
                    } catch (error) {
                        console.error(`Error fetching data for ${pokemon.name}:`, error);
                        return null;
                    }
                })
            );

            return PokeArray.filter((poke) => poke !== null);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            throw error;
        }
    }

    async getPokesDb() {
        try {
            const pokemonDb = await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });

            return pokemonDb.map((e) => ({
                id: e.id,
                name: e.name,
                attack: e.attack,
                types: e.types.map((t) => t.name),
                img: e.img,
                createdByUser: e.createdByUser,
                strength: e.strength
            }));
        } catch (error) {
            console.error('Error fetching Pokémon from database:', error);
            throw error;
        }
    }

    async getPokemonByName(name) {
        //  quiero buscar los nombre en la api
        try {
            const { data } = await axios.get(`${this.urlAll}${name}`);
            const poke = {
                id: data.id,
                name: data.name,
                img: data.sprites.other.home.front_default,
                attack: data.stats[1].base_stat,
                hp: data.stats[0].base_stat, // Agregar HP
                defense: data.stats[2].base_stat, // Agregar Defensa
                speed: data.stats[5].base_stat, // Agregar Velocidad
                strength: data.strength || 0, // Asignar un valor por defecto si no existe
                types: data.types.map((e) => e.type.name),
            };
            return poke;
        } catch (error) {
            console.error('Error fetching Pokémon by name:', error);
            throw error;
        }
    }

    async getPokemonByNameDb(name) {
        try {
            const pokemon = await Pokemon.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`, // Búsqueda insensible a mayúsculas y minúsculas
                    },
                },
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });
            if (!pokemon) {
                throw new Error('Pokémon not found in database');
            }
            return {
                id: pokemon.id,
                name: pokemon.name,
                attack: pokemon.attack,
                types: pokemon.types.map((t) => t.name),
                img: pokemon.img,
                hp: pokemon.hp, // Agregar HP
                defense: pokemon.defense, // Agregar Defensa
                speed: pokemon.speed, // Agregar Velocidad
                createdByUser: pokemon.createdByUser,
                strength: pokemon.strength
            };
        } catch (error) {   
            console.error('Error fetching Pokémon by name from database:', error);
            throw error;
        }
    }   

    async getPokeId(id) {   
        try {
            const { data } = await axios.get(`${this.urlAll}${id}`);
            const poke = {
                id: data.id,
                name: data.name,
                img: data.sprites.other.home.front_default,
                hp: data.stats[0].base_stat, // Agregar HP
                defense: data.stats[2].base_stat, // Agregar Defensa
                speed: data.stats[5].base_stat, // Agregar Velocidad
                attack: data.stats[1].base_stat,
                types: data.types.map((e) => e.type.name),
                strength: data.strength || 0, // Asignar un valor por defecto si no existe
            };
            return poke;
        } catch (error) {
            console.error('Error fetching Pokémon by ID:', error);
            throw error;
        }
    }

    async getPokeIdDb(id) {
        try {
            const pokeId = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            });

            if (!pokeId) {
                throw new Error('Pokémon not found');
            }

            return {
                id: pokeId.id,
                name: pokeId.name,
                attack: pokeId.attack,
                hp: pokeId.hp,
                defense: pokeId.defense,
                speed: pokeId.speed,
                types: pokeId.types.map((t) => t.name),
                img: pokeId.img,
                createdByUser: pokeId.createdByUser,
                strength: pokeId.strength
            };
        } catch (error) {
            console.error('Error fetching Pokémon by ID from database:', error);
            throw error;
        }
    }


    async getPokeIdApiOrDb(id) {
        try {
            // Validar si el ID es numérico o un UUID
            const isNumericId = !isNaN(id); // Verifica si el ID es un número
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id); // Verifica si es un UUID válido

            if (!isNumericId && !isUuid) {
                throw new Error(`El ID "${id}" no es válido. Debe ser un número o un UUID.`);
            }

            // Buscar en la API si el ID es numérico
            const pokeApi = isNumericId ? await this.getPokeId(id) : null; // Buscar por pokeApiId si es numérico
            // Buscar en la base de datos
            const pokemonDb = isNumericId
                ? await this.getPokeId(id) // Buscar por pokeApiId si es numérico
                : await this.getPokeIdDb(id)// Buscar por UUID si no es numérico

            // Si no se encuentra ningún Pokémon, lanzar un error
            if (!pokeApi && !pokemonDb) {
                throw new Error(`El Pokémon con el ID "${id}" no fue encontrado.`);
            }

            return pokeApi || pokemonDb; // Retornar el Pokémon encontrado

        } catch (error) {
            console.error(`Error en getPokeIdApiOrDb: ${error.message}`);
            throw new Error(`Error fetching Pokémon data by ID: ${error.message}`);
        }
    }

    async createPoke(poke) {
    try {
        // Crear el nuevo Pokémon en la base de datos
        const newPokemon = await Pokemon.create({
            name: poke.name,
            img: poke.img,
            attack: poke.attack,
            hp: poke.hp || 0,
            defense: poke.defense || 0,
            speed: poke.speed || 0,
            height: poke.height || 0,
            weight: poke.weight || 0,
            strength: poke.strength || 0,
            createdByUser: poke.createdByUser || true,
        });

        // Asociar los tipos al Pokémon si se proporcionan
        if (poke.types && poke.types.length > 0) {
            // Verificar si los tipos existen en la base de datos
            const existingTypes = await Type.findAll({
                where: { name: poke.types },
            });

            if (!poke.types || poke.types.length === 0) {
                throw new Error("No se proporcionaron tipos. El Pokémon no puede ser creado.");
            }
            
            // Si no existen, lanza un error y no lo crea
            if (existingTypes.length !== poke.types.length) {
                throw new Error("Algunos tipos no existen en la base de datos.");   
            }

            // Buscar nuevamente todos los tipos (incluyendo los recién creados)
            const allTypes = await Type.findAll({
                where: { name: poke.types },
            });

            await newPokemon.addType(allTypes); // Asociar los tipos al Pokémon
        }

        // Consultar el Pokémon creado con los tipos asociados
        const pokemonWithTypes = await Pokemon.findByPk(newPokemon.id, {
            include: {
                model: Type,
                attributes: ["name"], // Incluir solo el nombre de los tipos
                through: { attributes: [] }, // Excluir datos de la tabla intermedia
            },
        });

        return pokemonWithTypes; // Retornar el Pokémon con los tipos asociados
    } catch (error) {
        console.error("Error creando el Pokémon:", error);
        throw new Error("Error al crear el Pokémon en el repositorio.");
    }
}

    async updatePoke(id, poke) {
        try {
            // Buscar el Pokémon por ID
            const pokemon = await Pokemon.findByPk(id);
            if (!pokemon) {
                throw new Error(`Pokémon con ID ${id} no encontrado.`);
            }

            // Actualizar los campos del Pokémon
            await pokemon.update({
                name: poke.name,
                img: poke.img,
                attack: poke.attack,
                hp: poke.hp,
                defense: poke.defense,
                speed: poke.speed,
                height: poke.height,
                weight: poke.weight,
                strength: poke.strength,
                createdByUser: poke.createdByUser || true, // Por defecto, se asume que fue creado por un usuario
            });

            return pokemon; // Retornar el Pokémon actualizado
        } catch (error) {
            console.error("Error actualizando el Pokémon:", error);
            throw new Error("Error al actualizar el Pokémon en el repositorio.");
        }
    }
    async deletePoke(id) {
        try {
            // Buscar el Pokémon por ID
            const pokemon = await Pokemon.findByPk(id);
            if (!pokemon) {
                throw new Error(`Pokémon con ID ${id} no encontrado.`);
            }

            // Eliminar el Pokémon
            await pokemon.destroy();
            return { message: `Pokémon con ID ${id} eliminado exitosamente.` };
        } catch (error) {
            console.error("Error eliminando el Pokémon:", error);
            throw new Error("Error al eliminar el Pokémon en el repositorio.");
        }
    }


}
module.exports = PokemonRepository;