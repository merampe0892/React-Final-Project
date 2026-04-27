import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const query = search.trim().toLowerCase();
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );

      setTimeout(() => {
        navigate("/PokemonList", { state: { pokemon: data } });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Pokémon not found");
      setLoading(false);
    }
  };

  const onSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="search-bar">
      <input
        id="pokemonName"
        type="text"
        className="pokemon__search"
        placeholder="Search Pokémon by name or ID..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={onSearchKeyDown}
      />

      <button
        onClick={handleClick}
        disabled={loading}
        className="pokemon-btn"
        id="searchBtn"
      >
        {loading ? <span className="spinner" /> : "Search"}
      </button>

      <br />

      <img
        className="input__img"
        alt="Pokemon Sprite"
        id="pokemonSprite"
      />

      <div id="error">{error}</div>
    </div>
  );
};

export default Search;

