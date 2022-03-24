import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, } from "../actions";
import "./PokemonCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Required name";
  if (!input.img) errors.img = "Required Img";
  if (input.height <= 0 || input.height > 10000)
    errors.height = "Required min 0 || max 10000";
  if (input.weight <= 0 || input.weight > 6000)
    errors.weight = "Required min 0 || max 6000";
  if (input.hp <= 0|| input.hp > 6000) errors.hp = "Required min 0 || max 6000";
  if (input.speed <= 0|| input.speed > 6000) errors.speed = "Required min 0 || max 6000";
  if (input.attack <= 0|| input.attack > 6000) errors.attack = "Required min 0 || max 6000";
  if (input.strength <= 0 || input.strength > 6000) errors.strength = "Required min 0 || max 6000";
  if (input.defense <= 0|| input.defense > 6000) errors.defense = "Required min 0 || max 6000";

  if (input.types.length === 0) errors.types = "Required Types";
  
  return errors;
}
function buttonHab(p) {
  if (Object.keys(p).length === 0) return false;
  else return true;
}

export default function PokemonCreate(props) {
  const dispatch = useDispatch();
  const history = useHistory()
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState([{
    name: "Required name",
    img: "Required Img",
    height: "Required min 0 || max 10000",
    types: "Required Types",
    hp: "Required HP",
    weight: "Required min 0 || max 6000",
    attack: "Required Attack",
    speed: "Required Speed",
    defense: "Required Defense",
    strength: "Required Strength"
  }]);
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

  let [button, setButton] = useState(true);

  useEffect(() => {
    setButton(buttonHab(errors));
  }, [errors]);

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
    dispatch(postPokemon(input));
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
    history.push("/home") 
  }
  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
  }

  return (
    <div className="create">
      <div className="divBtnCreate">
        <Link to="/home">
          <button className="btnBackCreate">Back</button>
        </Link>
      </div>
      <div className="content">
        <div className="divData">
          <div>
            <h1>Crea tu Pokemon</h1>
            <img src="https://i.gifer.com/origin/d8/d80f886437ed5e505648c5c36ce17fcc_w200.gif" alt="" />
          </div>
          <div className="divForm">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="form"
              id="formulario"
            >
              <div className="midInfCreate">
                <div className="midLeft">
                  <div id='controled'>
                    <label>Name:</label>
                    <input
                      type="text"
                      value={input.name.toLocaleLowerCase()}
                      name="name"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.name && <p> {errors.name}</p>}</div>
                  </div>
                  <div id='controled'>
                    <div>
                      <label>Image Card:</label>
                      <input
                        type="text"
                        value={input.img}
                        name="img"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div id='controlerColor'>{errors.img && <p> {errors.img}</p>}</div>
                  </div>

                  <div id='controled'>
                    <label>Height:</label>
                    <input
                      type="number"
                      value={input.height}
                      name="height"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.height && <p> {errors.height}</p>}</div>
                  </div>
                  <div id='controled'>
                    <label>Weight:</label>
                    <input
                      type="number"
                      value={input.weight}
                      name="weight"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.weight && <p> {errors.weight}</p>}</div>
                  </div>
                  <div id='controled'>
                    <label>HP:</label>
                    <input
                      type="number"
                      value={input.hp}
                      name="hp"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.hp && <p> {errors.hp}</p>}</div>
                  </div>
                  <div id='controled'>
                    <label>Speed:</label>
                    <input
                      type="number"
                      value={input.speed}
                      name="speed"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.speed && <p> {errors.speed}</p>}</div>
                  </div>
                  <div id='controled'>
                    <label>Attack:</label>
                    <input
                      type="number"
                      value={input.attack}
                      name="attack"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.attack && <p> {errors.attack}</p>}</div>
                  </div>
                  <div id='controled'>
                    <label>Strength:</label>
                    <input
                      type="number"
                      value={input.strength}
                      name="strength"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.strength && <p> {errors.strength}</p>}</div>
                  </div>
                  <div id='controled'>
                    <label>Defense:</label>
                    <input
                      type="number"
                      value={input.defense}
                      name="defense"
                      onChange={(e) => handleChange(e)}
                    />
                    <div id='controlerColor'>{errors.defense && <p> {errors.defense}</p>}</div>
                  </div>
                </div>
                <div className="midRight">
              <div>
                <label>Types:</label>
                <select onChange={(e) => handleSelect(e)}>
                  <option value="select">Select</option>
                  {types &&
                    types.map((e) => (
                      <option name="types" key={e.name} value={e.name}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                {input.types?.map((e) => (
                  <div key={e}>
                    <label>{e}</label>
                    <button onClick={() => handleDelete(e)}>x</button>
                  </div>
                ))}
                <div id='controlerColor'>{errors.types && <p> {errors.types}</p>}</div>
              </div>
              <div>
                <button
                  className="btnCreate"
                  disabled={button}
                  form="formulario"
                >
                  Create Pokemon
                </button>
              </div>
            </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

