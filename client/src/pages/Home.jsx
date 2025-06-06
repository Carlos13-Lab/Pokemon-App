import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPokemons,
  fillterPokemonsCreated,
  filterPokemonByType,
  orderByName,
  orderByStrength,
  getTypes,
} from "../actions";
import Card from "../components/Card";
import Paginate from "../components/Paginate";
import { MdRefresh } from "react-icons/md";
import Nav from "../components/Nav";
import ReactLoading from "react-loading";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orden: "",
      currentPage: 1,
      pokemonsPerPage: 7,
    };
  }

  componentDidMount() {
    this.props.getPokemons();
    this.props.getTypes();
  }

  paginado = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.getPokemons();
  };

  handleFilterPokemonsCreated = (e) => {
    this.props.fillterPokemonsCreated(e.target.value);
  };

  handleFilterType = (e) => {
    e.preventDefault();
    this.props.filterPokemonByType(e.target.value);
    this.setState({ currentPage: 1, orden: ` ${e.target.value}` });
  };

  handleOrderByName = (e) => {
    e.preventDefault();
    if (e.target.value !== "ALFABET") {
      this.props.orderByName(e.target.value);
      this.setState({ currentPage: 1, orden: `Ordenado ${e.target.value}` });
    }
  };

  handleOrderByStrength = (e) => {
    e.preventDefault();
    if (e.target.value !== "MAX-MIN") {
      this.props.orderByStrength(e.target.value);
      this.setState({ currentPage: 1, orden: `Ordenado ${e.target.value}` });
    }
  };

  render() {
    const { allPokemons, types, isLoadingPokemons } = this.props;
    const { currentPage, pokemonsPerPage } = this.state;
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(
      indexOfFirstPokemon,
      indexOfLastPokemon
    );

    return (
      <div>
        <Nav />
        <div className="filter">
          <button
            onClick={this.handleClick}
            className="btnRefresh"
          >
            <MdRefresh />
          </button>
          <select
            className="formSelect"
            onChange={this.handleOrderByName}
          >
            <option>ALFABET</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className="formSelect"
            onChange={this.handleFilterPokemonsCreated}
          >
            <option value="All">All</option>
            <option value="Api">API</option>
            <option value="Created">Created</option>
          </select>
          <select
            className="formSelect"
            onClick={this.handleFilterType}
          >
            {types &&
              types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
          </select>
          <select
            className="formSelect"
            onClick={this.handleOrderByStrength}
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
            paginado={this.paginado}
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
          ) : (
            currentPokemons.map((p) => (
              <Card
                strength={p.strength}
                key={p.id}
                id={p.id}
                name={p.name}
                img={p.img}
                types={p.types}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allPokemons: state.pokemons,
  types: state.types,
  isLoadingPokemons: state.isLoadingPokemons,
});

const mapDispatchToProps = {
  getPokemons,
  fillterPokemonsCreated,
  filterPokemonByType,
  orderByName,
  orderByStrength,
  getTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);