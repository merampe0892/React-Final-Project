import React from 'react'
import Card from "../ui/Card";

const TeamCard = ({ renderTypes, removeFromTeam, team }) => {
  return (
    <div>
      <div className="team__container">
        {(team || []).map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites?.front_default}
            imageAlt={pokemon.name}
            subtitle={`#${pokemon.id}`}
            children={renderTypes(pokemon?.types || [])}
            onRemove={() => removeFromTeam(pokemon.id)}
            isAdded={true}
          />
        ))}
      </div>
    </div>
  );
}

export default TeamCard