import React, { useEffect, useState } from "react";
import usePokemonStore from "../store/PokemonStore"; // Importar el store de Zustand
import Card from "../components/Card";
import Paginate from "../components/Paginate";
import { MdRefresh } from "react-icons/md";
import Nav from "../components/Nav";
import ReactLoading from "react-loading";
import "../styles/Home/Home.css"; // Importar estilos específicos para Home

const Home = () => {
  const {
    pokemons,
    types,
    isLoading,
    fetchPokemons,
    fetchTypes,
    filterPokemonsCreated,
    filterPokemonByType,
    orderPokemonsByName,
    fetchPokemonByName,
    orderPokemonsByStrength,
    fetchPokemonByNameDb,

  } = usePokemonStore(); // Obtener el estado y las acciones desde el store

  const [currentPage, setCurrentPage] = useState(1);
   const [searchResult, setSearchResult] = useState(null);
  const pokemonsPerPage = 7;
  const [orden, setOrden] = useState("");
  // Obtener Pokémon y tipos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemons();
      await fetchTypes();
      await fetchPokemonByName(""); // Inicializar la búsqueda con un término vacío
    };
    fetchData();
  }, [fetchPokemons, fetchTypes, fetchPokemonByName]);

  // Función para manejar la paginación
  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  // Función para refrescar la lista de Pokémon
  const handleRefresh = (e) => {
    e.preventDefault();
    fetchPokemons();
  };

  // Función para filtrar Pokémon creados o de la API
  const handleFilterPokemonsCreated = (e) => filterPokemonsCreated(e.target.value);

  // Función para filtrar Pokémon por tipo
  const handleFilterType = (e) => {
    e.preventDefault();
    filterPokemonByType(e.target.value);
    setCurrentPage(1);
    setOrden(`Filtrado por tipo: ${e.target.value}`);
  };

  // Función para ordenar Pokémon por nombre
  const handleOrderByName = (e) => {
    e.preventDefault();
    if (e.target.value !== "Alphabet") {
      orderPokemonsByName(e.target.value);
      setCurrentPage(1);
      setOrden(`Ordenado por nombre: ${e.target.value}`);
    }
  };

  // Función para ordenar Pokémon por fuerza
  const handleOrderByStrength = (e) => {
    e.preventDefault();
    if (e.target.value !== "MAX-MIN") {
      orderPokemonsByStrength(e.target.value);
      setCurrentPage(1);
      setOrden(`Ordenado por fuerza: ${e.target.value}`);
    }
  };

const handleSearch = async (name) => {
    try {
        // Intentar buscar en la API
        let result = await fetchPokemonByName(name);

        // Si no se encuentra en la API, intentar buscar en la base de datos
        if (!result || !result.name) {
            console.log(`Pokémon no encontrado en la API. Buscando en la base de datos...`);
            result = await fetchPokemonByNameDb(name);
        }

        // Si se encuentra en alguna fuente, actualizar el estado
        if (result && result.name) {
            setSearchResult(result); // Actualizar el estado con el resultado de búsqueda
            setCurrentPage(1); // Reiniciar la paginación
        } else {
            // Si no se encuentra en ninguna fuente, mostrar un mensaje
            console.error(`Pokémon con el nombre "${name}" no encontrado.`);
            setSearchResult(null); // Limpiar el estado de búsqueda
        }
    } catch (error) {
        console.error(`Error buscando Pokémon: ${error.message}`);
        setSearchResult(null); // Limpiar el estado de búsqueda en caso de error
    }
};

  // Calcular los Pokémon actuales para la paginación
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <div>
      <Nav onSearch={handleSearch}/>
      <div className="filter">
        <button onClick={handleRefresh} className="btnRefresh">
          <MdRefresh />
        </button>
        <select className="formSelect" onChange={handleOrderByName}>
          <option>Alphabet</option>
          <option value="asc">A-z</option>
          <option value="desc">Z-a</option>
        </select>
        <select className="formSelect" onChange={handleFilterPokemonsCreated}>
          <option value="All">All</option>
          <option value="Api">API</option>
          <option value="Created">Created</option>
        </select>
        <select className="formSelect" onChange={handleFilterType}>
        {types?.map((type, index) => (
          <option key={index} value={type.name || type}>
            {type.name || type}
          </option>
        ))}
      </select>
        <select className="formSelect" onChange={handleOrderByStrength}>
          <option>MAX-MIN</option>
          <option value="Max">Max Strength</option>
          <option value="Min">Min Strength</option>
        </select>
      </div>

      <div className="paginate">
        <Paginate
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={pokemons.length}
          paginado={paginado}
        />
      </div>

      <div className="listPokemon">
  {isLoading ? (
    <ReactLoading
      className="spinner"
      type="spinningBubbles"
      color="#ee9b00"
      height="10%"
      width="10%"
    />
  ) : searchResult ? (
    searchResult.name ? (
      <Card
        key={searchResult.id}
        id={searchResult.id}
        name={searchResult.name}
        img={searchResult.img}
        types={searchResult.types}
        strength={searchResult.strength}
      />
    ) : (
      <p>Pokémon no encontrado</p>
    )
  ) : (
    currentPokemons.map((pokemon) => (
      <Card
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        img={pokemon.img}
        types={pokemon.types}
        strength={pokemon.strength}
      />
    ))
  )}
</div>
    </div>
  );
};

export default Home;