import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"

const Card = ({
  id,
  name,
  image,
  imageAlt,
  subtitle,
  children,
  className = "",
  to, 
  onAdd,
  onRemove,
  isAdded,
}) => {
  const Wrapper = to ? Link : "div";
  const wrapperProps = to ? { to } : {};

  return (
    <div className={`pokemon-card ${className}`} key={id}>
      <Wrapper {...wrapperProps} className="pokemon-link">
        <img src={image} alt={imageAlt || name} />
        <h4>{name}</h4>
        {subtitle && <p>{subtitle}</p>}
        {children}
      </Wrapper>

      {onAdd && !isAdded && (
        <button className="select-pokemon" onClick={onAdd}>
          Add to team
        </button>
      )}

      {onRemove && isAdded && (
        <button className="select-pokemon" onClick={onRemove}>
          Remove
        </button>
      )}
    </div>
  );
};

export default Card;