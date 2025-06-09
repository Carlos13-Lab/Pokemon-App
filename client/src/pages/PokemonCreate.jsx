import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import usePokemonStore from "../store/PokemonStore"; // Importar el store de Zustand
import "../styles/Create/PokemonCreate.css"; // Ajustar la ruta según sea necesario

function validate(input) {
  let errors = {};
  console.log(errors)
    if (!input.name) errors.name = "Required name";
  if (!input.img) errors.img = "Required Img";
  if (input.height <= 0 || input.height > 10000)
    errors.height = "Required min 0 || max 10000";
  if (input.weight <= 0 || input.weight > 6000)
    errors.weight = "Required min 0 || max 6000";
  if (input.hp <= 0 || input.hp > 6000) errors.hp = "Required min 0 || max 6000";
  if (input.speed <= 0 || input.speed > 6000) errors.speed = "Required min 0 || max 6000";
  if (input.attack <= 0 || input.attack > 6000) errors.attack = "Required min 0 || max 6000";
  if (input.strength <= 0 || input.strength > 6000) errors.strength = "Required min 0 || max 6000";
  if (input.defense <= 0 || input.defense > 6000) errors.defense = "Required min 0 || max 6000";

  if (input.types.length === 0) errors.types = "Required Types";

  return errors;
}

export default function PokemonCreate() {
  const history = useHistory(); // Usar useNavigate para redirigir al usuario
  const { types, createPokemon } = usePokemonStore(); // Obtener datos y acciones desde el store de Zustand
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    img: "",
    height: "",
    weight: "",
    hp: "",
    types: [],
    attack: "",
    defense: "",
    speed: "",
    strength: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const validationErrors = validate(input);
    setErrors(validationErrors);
    setButtonDisabled(Object.keys(validationErrors).length > 0);
  }, [input]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (e.target.value !== "select") {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    setErrors(validate({ ...input, types: [...input.types, e.target.value] }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createPokemon(input); // Llamar a la acción de Zustand para crear el Pokémon
    alert("Pokemon Created");
    setInput({
      name: "",
      img: "",
      height: "",
      weight: "",
      hp: "",
      types: [],
      attack: "",
      defense: "",
      speed: "",
      strength: "",
    });
    history.push("/home"); // Redirigir al usuario a la página de inicio
  }
  
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Crea tu Pokemon</h1>
        <Link to="/home">
          <button className="btnBack1">Back</button>
        </Link>
        <section className="datacontainer">
          <div className="flexform">
            <div className="flexinput">
              <label>Nombre:</label>
              <input
                className="input"
                type="text"
                placeholder="Nombre"
                name="name"
                value={input.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="flexinput">
              <label>Vida:</label>
              <input
                className="input"
                type="number"
                placeholder="Vida"
                name="hp"
                value={input.hp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flexform">
            <div className="flexinput">
              <label>Fuerza:</label>
              <input
                className="input"
                type="number"
                placeholder="Fuerza"
                name="strength"
                value={input.strength}
                onChange={handleChange}
              />
            </div>
            <div className="flexinput">
              <label>Defensa:</label>
              <input
                className="input"
                type="number"
                placeholder="Defensa"
                name="defense"
                value={input.defense}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flexform">
            <div className="flexinput">
              <label>Velocidad:</label>
              <input
                className="input"
                type="number"
                placeholder="Velocidad"
                name="speed"
                value={input.speed}
                onChange={handleChange}
              />
            </div>
            <div className="flexinput">
              <label>Altura:</label>
              <input
                className="input"
                type="number"
                placeholder="Altura"
                name="height"
                value={input.height}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="flexform">
            <div className="flexinput">
              <label>Peso:</label>
              <input
                className="input"
                type="number"
                placeholder="Peso"
                name="weight"
                value={input.weight}
                onChange={handleChange}
              />
            </div>
            <div className="flexinput">
              <label>Ataque:</label>
              <input
                className="input"
                type="text"
                placeholder="Ataque"
                name="attack"
                value={input.attack}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
           <div className="flexform">
          
            <div className="flexinput">
              <label>Imagen:</label>
              <input
                className="input"
                type="text"
                placeholder="url..."
                name="img"
                value={input.img}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          
        </section>
        <label style={{ fontWeight: "bold" }}>Tipo:</label>
        <div className="checkcontainer">
          
          {types?.map((type) => (
            <div key={type.name} className="check">
              <p className={type}>{type}</p>
              <input
                type="checkbox"
                name={type}
                value={type}
                onChange={handleSelect}
              />
            </div>
          ))}
          {input.types.length > 2 ? (
            <p className="errormessage2">Seleccione Máximo 2 Tipos</p>
          ) : null}
        </div>
        <button className="btnsend" type="submit" disabled={buttonDisabled}>
          Enviar
        </button>
      </form>
    </div>
  );
}