import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {

    dispatch({
      type: "GET_POKEMONS",
      payload: [],
      loading: true,
    });

    var json = await axios.get("/pokemons");

    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
      loading: false,
    });
  };
}
export function getPokemonName(name) {
  
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons?name=" + name)
      // console.log(json.data)

      return dispatch({
        type: "GET_POKEMON_NAME",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export function fillterPokemonsCreated(payload) {
  return {
    type: "FILTER_POKEMONS_CREATED",
    payload
  };
}
export function filterPokemonByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function resetDetail() {
  return {
    type: "RESET_DETAIL",
    
  };
}
export function orderByStrength(payload) {
  return {
    type: "ORDER_BY_STRENGTH",
    payload,
  };
}
export function getTypes(name) {
  return async function (dispatch) {
    var json = await axios.get(`/types`);
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
}
export function postPokemon(payload) {
  return async function (dispatch) {
    var json = await axios.post(`/pokemons`, payload);
    return json;
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/pokemons/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
  
}



//acción que permite cambiara true el estado de loader
export function trueLoader() {
  return {
    type: "LOADER_TRUE",
  };
}

//acción que permite cambiar a false es estado de loader
export function falseLoader() {
  return {
    type: "LOADER_FALSE",
  };
}
