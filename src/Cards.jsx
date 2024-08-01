import './Pokemon.css'

export const Cards = ({ pokeData }) => {
  console.log(pokeData);
  return (
    <li className='border-solid rounded-lg text-center h-72 w-60 after:border-transparent flex flex-col gap-3 bg-slate-200 hover:bg-red-200 cursor-pointer'>
  
      <img
        src={pokeData.sprites.other.dream_world.front_default}
        alt={pokeData.name}
        className=" h-20 w-20 m-auto bg-slate-100 rounded-lg px-2"
      />
  
    <h2 className=' font-bold text-green-800'>{pokeData.name}</h2>
    <div className=" text-white font-semibold font-mono text-sm">
        <p className=' bg-teal-300 rounded-2xl w-20 m-auto'>
            {
                pokeData.types.map((currType) =>
                currType.type.name).join(", ")
            }
        </p>
    </div>
    <div className="grid grid-cols-3 justify-center justify-items-center gap-2">
        <p className=" text-xs">
        Hieght: <span className='text-pink-900 font-bold'>{pokeData.height}</span>
        </p>
        <p className=" text-xs">
        Weight: <span className='text-pink-900 font-bold'>{pokeData.weight}</span> 
        </p>
        <p className=" text-xs">
        Speed: <span className='text-pink-900 font-bold'>{pokeData.stats[5].base_stat}</span>
        </p>
    </div>
    <div className="grid grid-cols-3 gap-2">

    <div className=" text-xs">
    <p className='text-green-900 font-bold'>{pokeData.base_experience}</p>
    <span>Experience</span>
    </div>

    <div className=" text-xs">
    <p className='text-red-900 font-bold'>{pokeData.stats[1].base_stat}</p>
    <span className=''>Attacks</span>
    </div>

    <div className=" text-xs">
    <p className='text-blue-900 font-bold'>{pokeData.abilities.map((abilityInfo) => abilityInfo.ability.name).slice(0,1).join(", ")}</p>
    <span>Abilities</span>
    </div>

    </div>
    </li>
  );
};
