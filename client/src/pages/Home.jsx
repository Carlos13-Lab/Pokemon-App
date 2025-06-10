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
    loading,
    fetchPokemons,
    fetchTypes,
    filterPokemonsCreated,
    orderPokemonsByName,
    fetchPokemonByName,
    orderPokemonsByStrength,
    fetchPokemonByNameDb,

  } = usePokemonStore(); // Obtener el estado y las acciones desde el store

  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState(null);
  const pokemonsPerPage = 9;
  const [filteredPokemons, setFilteredPokemons] = useState([]);


  const [orden, setOrden] = useState("");
  // Obtener Pokémon y tipos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      await fetchPokemons();
      await fetchTypes();
      await fetchPokemonByName(""); // Inicializar la búsqueda con un término vacío
      setFilteredPokemons(pokemons); // Inicializar los Pokémon filtrados con todos los Pokémon
    };
    fetchData();
  }, [ fetchPokemons, fetchTypes]);

  // Función para manejar la paginación
  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  // Función para refrescar la lista de Pokémon
  const handleRefresh = (e) => {
    e.preventDefault();
    fetchPokemons(); // Volver a obtener todos los Pokémon
    setFilteredPokemons(pokemons); // Reiniciar los Pokémon filtrados
    setCurrentPage(1); // Reiniciar la paginación
    setSearchResult(null); // Limpiar el resultado de búsqueda
    setOrden(""); // Limpiar el orden
  };

  // Función para filtrar Pokémon por tipo
 const handleFilterType = (e) => {
    const selectedType = e.target.value;
    const filtered = pokemons.filter((pokemon) =>
      pokemon.types && pokemon.types.includes(selectedType)
    );

    if (filtered.length === 0) {
      alert(`No se encontraron Pokémon para el tipo: ${selectedType}`); // Mostrar alerta si no hay resultados
      setFilteredPokemons(pokemons); // Reiniciar a todos los Pokémon si no hay resultados
      return;
    }

    setFilteredPokemons(filtered); // Actualizar el estado con los Pokémon filtrados
    setCurrentPage(1); // Reiniciar la paginación
  };

  // Función para ordenar Pokémon por nombre
  const handleOrderByName = (e) => {
    const order = e.target.value;
    if (order === "Asc" || order === "Desc") {
      orderPokemonsByName(order); // Llamar a la función del store
      setFilteredPokemons(pokemons); // Sincronizar el estado local con los datos ordenados
      setCurrentPage(1); // Reiniciar la paginación
      setOrden(`Ordenado por nombre: ${order}`); // Actualizar el estado de orden
    }
  };

const handleFilterPokemonsCreated = (e) => {
  const value = e.target.value;
  if (value === "Created") {
    const filtered = pokemons.filter((pokemon) => pokemon.createdByUser); // Filtrar solo los creados por el usuario
    setFilteredPokemons(filtered); // Actualizar el estado con los Pokémon filtrados
  } else {
    setFilteredPokemons(pokemons); // Mostrar todos los Pokémon si se selecciona "All"
  }
  setCurrentPage(1); // Reiniciar la paginación
  setOrden(`Filtrado por: ${value}`); // Actualizar el estado de orden
};


  // Función para ordenar Pokémon por fuerza
  const handleOrderByAttack = (e) => {
    const order = e.target.value;
    if (order === "Max" || order === "Min") {
      orderPokemonsByStrength(order); // Llamar a la función del store
      setFilteredPokemons(pokemons); // Sincronizar el estado local con los datos ordenados
      setCurrentPage(1); // Reiniciar la paginación
      setOrden(`Ordenado por fuerza: ${order}`); // Actualizar el estado de orden
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
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <div>
      <Nav onSearch={handleSearch}/>
      <div className="filter">
        <button onClick={handleRefresh} className="btnRefresh">
          <MdRefresh />
        </button>
        <select className="formSelect" onChange={handleOrderByName}>
          <option>Alphabet</option>
          <option value="Asc">A-z</option>
          <option value="Desc">Z-a</option>
        </select>
        <select className="formSelect" onChange={handleFilterPokemonsCreated}>
          <option value="All">All</option>
          <option value="Created">Created</option>
        </select>
        <select className="formSelect" onChange={handleFilterType}>
        {types?.map((type, index) => (
          <option key={index} value={type.name || type}>
            {type.name || type}
          </option>
        ))}
      </select>
        <select className="formSelect" onChange={handleOrderByAttack}>
          <option>Max-Min</option>
          <option value="Max">Max</option>
          <option value="Min">Min</option>
        </select>
      </div>



      <div className="listPokemon">
  {loading ? (
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
      />
    ))
  )}
</div>
      <div className="paginate">
        <Paginate
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={filteredPokemons.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
  
  
};


export default Home;