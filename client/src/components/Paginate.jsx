import React from "react";
// import "./Paginate.css"

export default function Paginate({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumber = [];
  const countPage =Math.ceil(allPokemons / pokemonsPerPage);
  for (let i = 0; i < countPage; i++) {
   
    pageNumber.push(i+1); 
    
  }
  return (
    <nav>
      <ul>
        {pageNumber?.map((n) => (
          <li  className='pagination' key={n}>
            <button  onClick={() => paginado(n)} >{n}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
