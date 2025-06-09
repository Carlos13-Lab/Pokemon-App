import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav/Nav.css"  
import SearchBar from "./SearchBar";

export default function Nav({ onSearch }) {
  return (
    <div className='nav'>
      <div className='titleNav'>
        <img src='https://1000marcas.net/wp-content/uploads/2020/01/Pok%C3%A9mon-emblema.jpg' alt='' height='90px' width='170px' />
      </div>
      <div className='searchPaginate'>
        <SearchBar onSearch={onSearch}/>
      </div>
      <div className='divBtn'>
        <Link to='/pokemons'>
          {" "}
          <button className='btnCreated'>Create Pokemon</button>
        </Link>
      </div>
    </div>
  );
}
