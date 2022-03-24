import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
export default function Card({ name, img, types, id, strength}) {
  return (
    <div className="card"> 

      <div>{id}</div>
      <div> {strength} </div>
      <div className="middleSup">
    
        <div className="nameCard">
          <h3 className="h3 ">{name.replace(name.charAt(0), name.charAt(0).toUpperCase())}</h3>
        </div>

      </div>    
     
      <div className="middleMidd">   
         <Link to={`/home/${id} `} style={{ textDecoration: "none" }}>
        <div className="imageCard" >
          <img src={img} alt=""/>
        </div>   </Link>
      </div>

      <div className="middleInf">
        <div className="types">
          {types?.map((e) => (
          <span key={e}>
           {' '}
           {e[0].toUpperCase() + e.slice(1)}
       </span>
          ))}
        </div>
      </div> 
     
    </div>
  );
}
