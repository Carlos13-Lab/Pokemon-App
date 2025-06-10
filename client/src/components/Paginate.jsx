import React from "react";
import "../styles/Paginate/Paginate.css"; // Asegúrate de ajustar la ruta según sea necesario

export default function Paginate({ pokemonsPerPage, allPokemons, paginado }) {
  // Calcular el número total de páginas
  const countPage = Math.ceil(allPokemons / pokemonsPerPage);

  // Generar los números de página usando Array.from
  const pageNumbers = Array.from({ length: countPage }, (_, index) => index + 1);

  return (
    <nav>
      <ul >
        {pageNumbers.map((n) => (
          <li className="pagination"key={n}>
            <button onClick={() => paginado(n)}>{n}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}