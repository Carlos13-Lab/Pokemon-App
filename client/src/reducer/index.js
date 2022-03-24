const inicialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
  isLoadingPokemons: true,
  pokemonsTypesFilter: [], //estado de los pokemons filtrados
};

export default function rootReducer(state = inicialState, action) {
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
        pokemons: action.payload 
      }    
      

    case "FILTER_POKEMONS_CREATED":
      const allPokemons1 = state.allPokemons
      // console.log(allPokemons1)
      const statusFiltered2 = action.payload === "Created" ? allPokemons1.filter(el => el.createdByUser) : allPokemons1.filter(el => !el.createdByUser) 
      // console.log(statusFiltered2)
      return {
        ...state,
        pokemons: action.payload === 'All' ? allPokemons1 : statusFiltered2.length ? statusFiltered2 : ['Pokemons created'],
      }

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
      
      let sortedArray =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              else return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              else return 0;
            });

      return {
        ...state,
        pokemons: sortedArray,
      };

    case "ORDER_BY_STRENGTH":
      let sortedStrength =
        action.payload === "min"
          ? state.pokemons.sort((a, b) => {
            if (a.strength > b.strength) return 1;
            if (a.strength < b.strength) return -1;
            else return 0;
          })
          : state.pokemons.sort((a, b) => {
            if (a.strength > b.strength) return -1;
            if (a.strength < b.strength) return 1;
            else return 0;
          });
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
      const allPokemons4 = state.allPokemons;
      const types1 = state.types;
      return {
        ...state,
        detail: [],
        pokemons: allPokemons4,
        types: types1,
      };
    case "LOADER_TRUE":
      //camiar el loader a true
      return {
        ...state,
        loader: true,
      };
    case "LOADER_FALSE":
      //cambiar el loader a false
      return {
        ...state,
        loader: false,
      };
     
    default:
      return state;
  }
}
