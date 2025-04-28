const express = require('express');
const { Pokemon, Type } = require('../database/config')
const urlLimit40 = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=26// `
const urlAll = `http://pokeapi.co/api/v2/pokemon/`
const axios = require('axios');

class PokemonRepository {
    constructor() {
        this.urlLimit40 = urlLimit40;
        this.urlAll = urlAll;
        this.getPokeApi = this.getPokeApi.bind(this);
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
                            types: Todos.types.map((e) => e.type.name),
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

    async getApiname(name) {
        try {
            const { data } = await axios.get(`${this.urlAll}${name}`);
            const poke = {
                id: data.id,
                name: data.name,
                img: data.sprites.other.home.front_default,
                attack: data.stats[1].base_stat,
                types: data.types.map((e) => e.type.name),
            };
            return poke;
        } catch (error) {
            console.error('Error fetching Pokémon by name:', error);
            throw error;
        }
    }
}

module.exports = PokemonRepository;