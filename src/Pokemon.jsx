import React, { useEffect, useState } from "react";
import "./Pokemon.css";
import { Cards } from "./Cards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(" ");

  // API
  const api = "https://pokeapi.co/api/v2/pokemon?limit=124";
  
  const pokemonData = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      // console.log(data);
      const detailedPokemonData = data.results.map(async (currPokemon) => {
        // console.log(currPokemon.url);
        const res = await fetch(currPokemon.url);
        const data = res.json();
        return data;
      });
      // console.log(detailedPokemonData);
      const detailedResponse = await Promise.all(detailedPokemonData);
      // console.log(detailedResponse);
        setPokemon(detailedResponse);
        setLoading(false);
    } catch (error) {
      // console.log(error);
        setLoading(false);
        setError(error);
    }
  };
  // useEffect for side effect
  useEffect(() => {
    pokemonData();
  }, []);

  // Search functinality is very important
  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1>Let's Catch Pokemon</h1>
        </header>
        <input
          type="text"
          placeholder="Search pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      {/* Cards */}
      <div>
        <ul className="cards">
          {/* {
            pokemon.map((currPokemon) => {
              return <Cards key={currPokemon.id} pokeData = {currPokemon} />
            })
            
          } */}
          {searchData.map((currPokemon) => {
            return <Cards key={currPokemon.id} pokeData={currPokemon} />;
          })}
        </ul>
      </div>
    </>
  );
};
