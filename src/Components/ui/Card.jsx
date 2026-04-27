import React from 'react'

const Card = ({ pokemon, onAdd}) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h4>{pokemon.name}</h4>
      <p>#{pokemon.id}</p>
      <button onClick={onAdd}>Add to team</button>
    </div>
  );
}

export default Card;