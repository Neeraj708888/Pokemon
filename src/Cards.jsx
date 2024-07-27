import './Pokemon.css'

export const Cards = ({ pokeData }) => {
  console.log(pokeData);
  return (
    <li className="pokeman-card">
    <figure>
      <img
        src={pokeData.sprites.other.dream_world.front_default}
        alt={pokeData.name}
        className="pokeman-image"
      />
    </figure>
    <h2>{pokeData.name}</h2>
    <div className="highlight">
        <p>
            {
                pokeData.types.map((currType) =>
                currType.type.name).join(", ")
            }
        </p>
    </div>
    <div className="grid-three-col">
        <p className="pokemon-info">
            <span>Hieght: </span> {pokeData.height}
        </p>
        <p className="pokemon-info">
            <span>Weight: </span> {pokeData.weight}
        </p>
        <p className="pokemon-info">
            <span>Speed:  </span> {pokeData.stats[5].base_stat}
        </p>
    </div>
    <div className="grid-three-col">
    <div>
    <p>{pokeData.base_experience}</p>
    <span>Experience: </span>
    </div>
    <div>
    <p>{pokeData.stats[1].base_stat}</p>
    <span>Attacks: </span>
    </div>
    <div>
    <p>{pokeData.abilities.map((abilityInfo) => abilityInfo.ability.name).slice(0,1).join(", ")}</p>
    <span>Abilities: </span>
    </div>
    </div>
    </li>
  );
};
