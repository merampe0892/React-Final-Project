
import React from 'react'
import { useEffect, useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import Search from '../Components/ui/Search';
import Sort from '../Components/ui/Sort';
const MAX_TEAM_SIZE = 6;


const PokemonList = () => {
  const location = useLocation();
  const searchedPokemon = location.state?.pokemon || null;

  const [allPokemon, setAllPokemon] = useState([]);
  const [team, setTeam] = useState([]);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const { data } = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
        );

        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );


        setAllPokemon(details);
      } catch (error) {
        console.error(error);
        setError("Error loading Pokémon.");
      }
    }

    fetchPokemon();
  }, []);

  function addToTeam(pokemon) {
    if (team.length >= MAX_TEAM_SIZE) {
      setError("Team is full. Remove a Pokémon first.");
      return;
    }

    if (team.some((p) => p.id === pokemon.id)) {
      setError("That Pokémon is already in your team.");
      return;
    }

    setTeam([...team, pokemon]);
    setError("");
  }

  function removeFromTeam(id) {
    setTeam(team.filter((pokemon) => pokemon.id !== id));
  }

  const searchedFound = searchedPokemon && !allPokemon.some((p) => p.id === searchedPokemon.id);

  const renderTypes = (types = []) => {
  return (
    <ul className="pokemon-types">
      {types
        .slice()
        .sort((a, b) => a.slot - b.slot)
        .map((typeInfo) => (
          <li key={typeInfo.slot} className="pokemon-type">
            {typeInfo.type.name}
          </li>
        ))}
    </ul>
  );
};

const filteredAndSortedPokemon = useMemo(() => {
  let list = [...allPokemon];
  if (selectedType) {
    list = list.filter(p => p.types.some(t => t.type.name === selectedType));
  }
  return list.sort((a, b) => a.name.localeCompare(b.name));
}, [allPokemon, selectedType]);



  return (
    <div>
      <div>
        <Nav />
        <h1>Pokemon List</h1>
        <Search />
        <Sort selectedType={selectedType} setSelectedType={setSelectedType} />
        <h2>Your Team</h2>
        <div className="team__container">
          {team.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h4>{pokemon.name}</h4>
              <p>#{pokemon.id}</p>
              {renderTypes(pokemon.types)}
              <button className='select-pokemon' onClick={() => removeFromTeam(pokemon.id)}>Remove</button>
            </div>
          ))}
        </div>
        {searchedPokemon && (
          <div className="pokemon-search-result">
            <h2>Searched Pokémon</h2>
            <div className="pokemon-card">
              <img
                src={searchedPokemon.sprites.front_default}
                alt={searchedPokemon.name}
              />
              <h4>{searchedPokemon.name}</h4>
              <p>#{searchedPokemon.id}</p>
              {renderTypes(searchedPokemon.types)}
              {!team.some((p) => p.id === searchedPokemon.id) ? (
              <button className='select-pokemon' onClick={() => addToTeam(searchedPokemon)}>Add to team</button>
            ) : (
              <button className='select-pokemon' onClick={() => removeFromTeam(searchedPokemon.id)}>Remove</button>
            )}
            </div>
          </div>
        )}
      </div>

      {error && <p>{error}</p>}

      <div className="pokemon__grid">
        {filteredAndSortedPokemon.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <Link to={`/PokemonDetails/${pokemon.id}`} className="pokemon-link">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h4>{pokemon.name}</h4>
              <p>#{pokemon.id}</p>
              {renderTypes(pokemon.types)}
            </Link>
            {!team.some((p) => p.id === pokemon.id) ? (
              <button className='select-pokemon' onClick={() => addToTeam(pokemon)}>Add to team</button>
            ) : (
              <button className='select-pokemon' onClick={() => removeFromTeam(pokemon.id)}>Remove</button>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PokemonList;

