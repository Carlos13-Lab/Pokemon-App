import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  fillterPokemonsCreated,
  filterPokemonByType,
  orderByName,
  orderByStrength,
  getTypes,
} from "../actions";
import Card from "./Card";
import Paginate from "./Paginate";
import { MdRefresh } from "react-icons/md";
import Nav from "./Nav"
import ReactLoading from "react-loading";

import "./Home.css";

export default function Home() {
  
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);
  const isLoadingPokemons = useSelector((state) => state.isLoadingPokemons);
  const [orden, setOrden] = useState(""); ///
  const [currentPage, setCurrrentPage] = useState(1);
  const [pokemonsPerPage, setpokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]); 


  const paginado = (pageNumber) => {
    setCurrrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterPokemonsCreated(e) {
      dispatch(fillterPokemonsCreated(e.target.value));
    
  }
  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterPokemonByType(e.target.value));
    setCurrrentPage(1);
    setOrden(` ${e.target.value}`);
  }
  function handleOrderByName(e) {
    e.preventDefault();
    if (e.target.value !== "ALFABET") {
      dispatch(orderByName(e.target.value));
      setCurrrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
  }
  function handleOrderByStrength(e) {
    e.preventDefault();
    if (e.target.value !== "MAX-MIN") {
      dispatch(orderByStrength(e.target.value));
      setCurrrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
  }

  return (
    <div>
      <Nav />
      <div className="filter">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className="btnRefresh"
        >
          <MdRefresh />
        </button>
        <select 
          className="formSelect"
          onChange={(e) => {
            handleOrderByName(e);
          }}
        >
          <option >ALFABET</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select className="formSelect" onChange={e => handleFilterPokemonsCreated(e)}>
          <option value="All">All</option>
          <option value="Api">API</option>
          <option value="Created">Created</option>
        </select>
        <select
          className="formSelect"
          onClick={(e) => {
            handleFilterType(e);
          }}
        >
          {types &&
            types?.map((type) => {
              return (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              );
            })}
        </select>

        <select
          className="formSelect"
          onClick={(e) => {
            handleOrderByStrength(e);
          }}
        >
          <option>MAX-MIN</option>
          <option value="max">Max Strength</option>
          <option value="min">Min Strength</option>
        </select>
      </div>

      <div className="paginate">
        <Paginate
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
      </div>


      <div className="listPokemon">
        {isLoadingPokemons ? (
          <ReactLoading
            className="spinner"
            type={"spinningBubbles"}
            color={"#ee9b00"}
            height={"10%"}
            width={"10%"}
          />
        ):(
          currentPokemons?.map((p) => {
            return (
                  <Card
                    strength={p.strength} 
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    img={p.img}
                    types={p.types} 
                  />
                  
            ) ;
          })
        ) 
        } 
      </div>
     
    </div>
  );
}
