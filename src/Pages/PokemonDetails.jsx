import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Card from "../Components/ui/Card";

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
  const [team, setTeam] = useState([]);
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
    if (!Array.isArray(allPokemon) || allPokemon.length === 0) {
      console.log("allPokemon is empty or not array:", allPokemon);
      return [];
    }

    const shuffled = shuffleArray(allPokemon);
    console.log("randomPokemon slice:", shuffled.slice(0, 6));
    return shuffled.slice(0, 6);
  }, [allPokemon]);

  const addToTeam = (p) => {
    if (team.length >= MAX_TEAM_SIZE) {
      setError("Team is full. Remove a Pokémon first.");
      return;
    }
    if (team.some((tp) => tp.id === p.id)) {
      setError("That Pokémon is already in your team.");
      return;
    }
    setTeam([...team, p]);
    setError("");
  };

  const removeFromTeam = (id) => {
    setTeam((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
  console.log("PokemonDetails mounted, allPokemon length:", allPokemon.length);
}, [allPokemon]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <Nav />
      <Link to="/PokemonList">Back to list</Link>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>#{pokemon.id}</p>
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>

      {error && <p>{error}</p>}

      <h2>6 Random Pokémon (add to team)</h2>
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
    onAdd={() => addToTeam(p)} 
    onRemove={() => removeFromTeam(p.id)} 
    isAdded={team.some((tp) => tp.id === p.id)}
  />
))}
  </div>
</div>

      <Footer />
    </div>
  );
};

export default PokemonDetails;