import React, { useState, useEffect, useCallback } from "react";
import './Pokemon.css'
import { Cards } from "./Cards";
import useFetchWithMemo from './useFetchWithMemo';

export const ApiData = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // API
  const api = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const { data, loading: fetchLoading, error: fetchError } = useFetchWithMemo(api);

  const fetchDetailedData = useCallback(async () => {
    if (data && data.results) {
      try {
        const detailedPokemonData = data.results.map(async (currPokemon) => {
          const res = await fetch(currPokemon.url);
          return res.json();
        });
        const detailedResponse = await Promise.all(detailedPokemonData);
        setPokemon(detailedResponse);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      fetchDetailedData();
    }
  }, [data, fetchDetailedData]);

  const searchData = pokemon.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading || fetchLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error || fetchError) {
    return (
      <div>
        <h1>{(error || fetchError).message}</h1>
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
          {searchData.map((currPokemon) => {
            return <Cards key={currPokemon.id} pokeData={currPokemon} />;
          })}
        </ul>
      </div>
    </>
  );
};
