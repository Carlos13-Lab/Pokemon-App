import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import usePokemonStore from "../store/PokemonStore"; // Importar el store de Zustand
import "../styles/Detail/Detail.css";
import ReactLoading from "react-loading";

export default function Detail() {
  const { id } = useParams(); // Obtener el ID de los parámetros de la URL
  const { pokemonDetail, loading, fetchPokemonById, deletePokemon } =
    usePokemonStore();
  useEffect(() => {
    fetchPokemonById(id); 
    // Obtener el detalle del Pokémon al montar el componente
  }, [id, fetchPokemonById]);
  const history = useHistory(); // Usar el hook useHistory para redirigir

    const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este Pokémon?"
    );
    if (confirmDelete) {
      await deletePokemon(id); // Llama a la acción para eliminar el Pokémon
      history.push("/home"); // Redirige a la página de inicio después de eliminar
      alert("Pokémon eliminado con éxito."); // Mensaje de éxito
    }
  };

  if (loading) {
    return (
      <div className="loadingContainer">
        <p>LOADING...</p>
        <ReactLoading
          className="spinner"
          type={"spinningBubbles"}
          color={"#ee9b00"}
          height={"10%"}
          width={"10%"}
          timeout={4000} // Tiempo de espera para el spinner
        />
      </div>
    );
  }

  if (!pokemonDetail) {
    return <p>No se encontró el Pokémon con el ID: {id}.</p>;
  }

  return (
    <div className="detailRender">
      <div className="detailCard">
        <div className="image">
          <img src={pokemonDetail.img} alt={pokemonDetail.name} />
        </div>
        <div className="midRight">
          <div className="midSup">
            <Link to="/home">
              <button className="btnBack">Back</button>
            </Link>
                 {pokemonDetail.createdByUser && (
              <button className="btnDelete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
          <div className="midInf">
            <div className="name">
              <strong>
                <h1>
                  {pokemonDetail.name.replace(
                    pokemonDetail.name.charAt(0),
                    pokemonDetail.name.charAt(0).toUpperCase()
                  )}
                </h1>
              </strong>
            </div>
            <div className="stats">
              <span id="hp">
                Hp:{" "}
                <progress
                  className="progress"
                  id="hp"
                  max="200"
                  value={pokemonDetail.hp}
                />{" "}
                {pokemonDetail.hp}
              </span>
              <span id="speed">
                Speed:{" "}
                <progress
                  className="progress"
                  id="speed"
                  max="200"
                  value={pokemonDetail.speed}
                />{" "}
                {pokemonDetail.speed}
              </span>
              <span id="attack">
                Attack:{" "}
                <progress
                  className="progress"
                  id="attack"
                  max="200"
                  value={pokemonDetail.attack}
                />{" "}
                {pokemonDetail.attack}
              </span>
              <span id="defense">
                Defense:{" "}
                <progress
                  className="progress"
                  id="defense"
                  max="200"
                  value={pokemonDetail.defense}
                />{" "}
                {pokemonDetail.defense}
              </span>
            </div>
            <div className="types">
              <h4 className="h4">
                Types:{" "}
                {pokemonDetail.types?.map((type) => (
                  <div id={type} key={type} className="type">
                    <span>{type[0].toUpperCase() + type.slice(1)}</span>
                  </div>
                ))}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}