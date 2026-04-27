import React from 'react'

const TeamCard = ({ pokemon, onRemove}) => {
  return (
    <div key={pokemon.id} className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h4>{pokemon.name}</h4>
      <p>#{pokemon.id}</p>
      <button onClick={() => removeFromTeam(pokemon.id)}>Remove</button>
    </div>
  );
}

export default TeamCard