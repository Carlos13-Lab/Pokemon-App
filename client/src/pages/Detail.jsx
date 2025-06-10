import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePokemonStore from "../store/PokemonStore"; // Importar el store de Zustand
import "../styles/Detail/Detail.css";
import ReactLoading from "react-loading";

export default function Detail() {
  const { id } = useParams(); // Obtener el ID de los parámetros de la URL
  const { pokemonDetail, loading, fetchPokemonById } = usePokemonStore(); // Obtener el estado y las acciones del store

  useEffect(() => {
    fetchPokemonById(id); 
    // Obtener el detalle del Pokémon al montar el componente
  }, [id, fetchPokemonById]);

  if (loading) {
    return (
      <div>
        <p>LOADING...</p>
        <ReactLoading
          className="spinner"
          type={"spinningBubbles"}
          color={"#ee9b00"}
          height={"10%"}
          width={"10%"}
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
            <div className="heWe">
              <span>Height: {pokemonDetail.height}</span>
              <span>Weight: {pokemonDetail.weight}</span>
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