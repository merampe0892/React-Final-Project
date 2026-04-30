import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Card from "../Components/ui/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const MAX_TEAM_SIZE = 6;

const PokemonDetails = ({ renderTypes }) => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [allPokemon, setAllPokemon] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(data);
      } catch (err) {
        console.error("Failed to fetch pokemon:", err);
      }
    }

    fetchPokemon();
  }, [id]);

  useEffect(() => {
    async function fetchPokemonList() {
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
      } catch (err) {
        console.error("Failed to fetch Pokémon list:", err);
        setError("Error loading Pokémon list.");
      }
    }

    fetchPokemonList();
  }, []);

  const randomPokemon = useMemo(() => {
    if (!Array.isArray(allPokemon) || allPokemon.length === 0 ||!pokemon) {
      return [];
    }

    const others = allPokemon.filter((p) => p.id !== pokemon.id);

    const shuffled = shuffleArray(allPokemon);
    return shuffled.slice(0, 6);
  }, [allPokemon, pokemon, id]);


  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <Nav />
      <div className="back__container">
        <Link to="/PokemonList">
          <FontAwesomeIcon icon="arrow-left" />
        </Link>
        <Link to="/PokemonList">
          <h2 className="back-arrow-title">Back to Pokemon List</h2>
        </Link>
      </div>
      <div className="pokemon-detail-card">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>
          #{pokemon.id} | {pokemon.weight} lbs | {pokemon.height} ft
        </p>

        <ul>
          {pokemon.types.map((type) => (
            <li className="pokemon-type" key={type.type.name}>
              {type.type.name}
            </li>
          ))}
        </ul>

        <h3>Abilities</h3>
        <ul>
          {pokemon.abilities?.map((abilityInfo) => (
            <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
          ))}
        </ul>

        <h3>Top 5 Moves</h3>
        <ul>
          {pokemon.moves?.slice(0, 5).map((moveInfo) => (
            <li key={moveInfo.move.name}>{moveInfo.move.name}</li>
          ))}
        </ul>

        <h3>Stats</h3>
        <ul>
          {pokemon.stats?.map((statInfo) => (
            <li key={statInfo.stat.name}>
              {statInfo.stat.name}: {statInfo.base_stat}
            </li>
          ))}
        </ul>
      </div>

      {error && <p>{error}</p>}

      <h2 className="additional-pokemon">Click on the Pokemon to see their stats!</h2>
      <div className="pokemon__container">
        <div className="row">
          {randomPokemon.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.sprites.front_default}
              imageAlt={p.name}
              subtitle={`#${p.id}`}
              to={`/PokemonDetails/${p.id}`}
              children={renderTypes ? renderTypes(p.types) : null}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PokemonDetails;