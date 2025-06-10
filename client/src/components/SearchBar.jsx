import React, { useState } from "react";
import PropTypes from "prop-types"; // Importar PropTypes para validar las props
import "../styles/Search/SearchBar.css"; // Asegúrate de ajustar la ruta según sea necesario

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState(""); // Estado local para el término de búsqueda

  const handleInputChange = (e) => {
    setName(e.target.value); // Actualizar el estado con el valor del input
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (name.trim()) {
    onSearch(name); // Llamar al callback `onSearch`
    setName(""); // Limpiar el input después de enviar
  }
};

  return (
    <div className="searchBar">
      <form className="searchBar" onSubmit={handleSubmit}>
        <input value={name} id="inputSearch" type='text' placeholder='Search...' onChange={e => handleInputChange(e)}></input>
            <button className="btnSearch" type='submit' onClick={e => handleSubmit(e)}>GO!</button>
      </form>
    </div>
  );
};

// Validar las props con PropTypes
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // `onSearch` debe ser una función
};

export default SearchBar;