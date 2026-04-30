import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Search from "../Components/ui/Search";
import Sort from "../Components/ui/Sort";
import Card from "../Components/ui/Card";
import TeamCard from "../Components/ui/TeamCard";

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
  setTeam((prevTeam) => {
    if (prevTeam.length >= MAX_TEAM_SIZE) {
      setError("Team is full.");
      return prevTeam;
    }
    if (prevTeam.some((p) => p.id === pokemon.id)) {
      setError("Already in team.");
      return prevTeam;
    }
    return [...prevTeam, pokemon];
  });
  setError("");
}

  function removeFromTeam(id) {
    setTeam(team.filter((pokemon) => pokemon.id !== id));
  }

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
      list = list.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [allPokemon, selectedType]);

useEffect(() => {
  const savedTeam = JSON.parse(localStorage.getItem('TeamCard'));
  if (savedTeam) setTeam(savedTeam);
}, []);

useEffect(() => {
  localStorage.setItem('TeamCard', JSON.stringify(team));
}, [team]);
  

  return (
    <div>
      <div>
        <Nav />
        <Search />
        <Sort
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {searchedPokemon && (
          <div className="pokemon-search-result">
            <h2 className="team-title">Searched Pokémon</h2>
            <Card
              id={searchedPokemon.id}
              name={searchedPokemon.name}
              image={searchedPokemon.sprites.front_default}
              imageAlt={searchedPokemon.name}
              subtitle={`#${searchedPokemon.id}`}
              to={`/PokemonDetails/${searchedPokemon.id}`}
              children={renderTypes(searchedPokemon.types)}
              onAdd={searchedPokemon ? () => addToTeam(searchedPokemon) : null}
              onRemove={
                searchedPokemon ? () => removeFromTeam(searchedPokemon.id) : null
              }
              isAdded={team.some((p) => p.id === searchedPokemon.id)}
            />
          </div>
        )}
      </div>

      <h2 className="team-title">Create Your Team</h2>
      <TeamCard
      team={team}
      renderTypes={renderTypes}
      removeFromTeam={removeFromTeam} />

      {error && <p>{error}</p>}
      <h1 className="team-title">Pokemon List</h1>
      <div className="pokemon__grid">
        {filteredAndSortedPokemon.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            imageAlt={pokemon.name}
            subtitle={`#${pokemon.id}`}
            to={`/PokemonDetails/${pokemon.id}`}
            children={renderTypes(pokemon.types)}
            onAdd={() => addToTeam(pokemon)}
            onRemove={() => removeFromTeam(pokemon.id)}
            isAdded={team.some((p) => p.id === pokemon.id)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PokemonList;