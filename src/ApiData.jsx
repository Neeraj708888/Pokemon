import React, { useState, useEffect, useCallback } from "react";
// import './Pokemon.css'
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
    {/* max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl */}
      <section className="flex flex-col gap-4 h-32 w-96 bg-lime-200 m-auto rounded-2xl opacity-90 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <header>
          <h1 className="h-full w-30 text-center m-auto text-xl font-bold">Let's Catch Pokemon</h1>
        </header>
        <input
          type="text"
          placeholder="Search pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="m-auto flex text-center h-auto w-auto cursor-pointer rounded-md placeholder:text-blue-200 placeholder:font-thin
          text-blue-900 font-bold after:opacity-85"
        />
      </section>
      {/* Cards */}
      {/* grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
      <div className="h-full w-full">
        <ul className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center justify-items-center bg-pink-100 rounded-xl">
          {searchData.map((currPokemon) => {
            return <Cards key={currPokemon.id} pokeData={currPokemon}
           />;
          })}
        </ul>
      </div>
    </>
  );
};
