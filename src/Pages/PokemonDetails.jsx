import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(data);
    }

    fetchPokemon();
  }, [id]);

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
      <Footer />
    </div>
  );
}

export default PokemonDetails;