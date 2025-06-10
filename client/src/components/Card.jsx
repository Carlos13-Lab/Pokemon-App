import React from "react";
import "../styles/Card/Card.css"; // Ajustar la ruta según sea necesario
import { Link } from "react-router-dom";

const Card = ({ name, img, types, id, strength }) => {
  // Validar que `name` esté definido antes de usar `.replace`
  const displayName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "Unknown";

  return (
    <div className="card">
      <div className="middleSup">
        <div className="nameCard">
          <h3 className="h3">{displayName}</h3>
        </div>
      </div>

      <div className="middleMidd">
        <Link to={`/home/${id}`} style={{ textDecoration: "none" }}>
          <div className="imageCard">
            <img src={img} alt={name || "Unknown"} width="90%" />
          </div>
        </Link>
      </div>

      <div className="middleInf">
        <div className="types">
          {types?.map((type, index) => (
            <div className="type" id={type} key={type || index}>
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;