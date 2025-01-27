const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
  isLoadingPokemons: true,
  pokemonsTypesFilter: [], // estado de los pokemons filtrados
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        isLoadingPokemons: action.loading,
      };

    case "GET_POKEMON_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "FILTER_POKEMONS_CREATED":
      const allPokemons1 = state.allPokemons;
      console.log(allPokemons1);
      const statusFiltered2 =
        action.payload === "Created"
          ? allPokemons1.filter((el) => el.createdByUser)
          : allPokemons1.filter((el) => !el.createdByUser);
      return {
        ...state,
        pokemons:
          action.payload === "All"
            ? allPokemons1
            : statusFiltered2.length
              ? statusFiltered2
              : ["Pokemons created"],
      };

    case "FILTER_BY_TYPE":
      const allPokemons2 = state.allPokemons;
      const statusFilter2 =
        action.payload === "all"
          ? allPokemons2
          : allPokemons2.filter((e) => e.types.includes(action.payload));
      return {
        ...state,
        pokemons: statusFilter2,
      };

    case "ORDER_BY_NAME":
      const sortedArray =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => (a.name > b.name ? 1 : -1))
          : state.pokemons.sort((a, b) => (a.name > b.name ? -1 : 1));
      return {
        ...state,
        pokemons: sortedArray,
      };

    case "ORDER_BY_STRENGTH":
      const sortedStrength =
        action.payload === "min"
          ? state.pokemons.sort((a, b) => (a.strength > b.strength ? 1 : -1))
          : state.pokemons.sort((a, b) => (a.strength > b.strength ? -1 : 1));
      return {
        ...state,
        pokemons: sortedStrength,
      };

    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: [action.payload],
      };

    case "RESET_DETAIL":
      return {
        ...state,
        detail: [],
        pokemons: state.allPokemons,
        types: state.types,
      };

    case "LOADER_TRUE":
      return {
        ...state,
        isLoadingPokemons: true,
      };

    case "LOADER_FALSE":
      return {
        ...state,
        isLoadingPokemons: false,
      };

    default:
      return state;
  }
}