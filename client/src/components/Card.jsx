import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
export default function Card({ name, img, types, id, strength}) {
  return (
    <div className='card'>
      <div className='middleSup'>
        <div className='nameCard'>
          <h3 className='h3 '>{name.replace(name.charAt(0), name.charAt(0).toUpperCase())}</h3>
        </div>
      </div>

      <div className='middleMidd'>
        <Link to={`/home/${id} `} style={{ textDecoration: "none" }}>
          <div className='imageCard'>
            <img src={img} alt='' width='90%'/>
          </div>{" "}
        </Link>
      </div>

      <div className='middleInf'>
        <div className='types'>
          {types?.map((e) => {
            return (
              <div className='type' id={e}>
                <span>{e.replace(e.charAt(0), e.charAt(0).toUpperCase())}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
