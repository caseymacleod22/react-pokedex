import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";
import Header from "./components/Header/Header";

function App() {

  const [allPokemon, setAllPokemon] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemon = async() => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject (result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemon(currentList => [...currentList, data])

      })
    }
    createPokemonObject(data.results)
    // await console.log(allPokemon)
    // console.log(data)
  }

  useEffect(() => {
    getAllPokemon()
  }, [])
  
  return (
    <div className='app-container'>
      <h1 className='header'>Pokédex</h1>
      <Header />
      <div className='pokemon-containter'>
        <div className='all-container'>
          {allPokemon.map((pokemon, index) => <PokemonThumbnail
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.other.dream_world.front_default}
          type={pokemon.types[0].type.name}
          key={index}
          />)}
        </div>
          {/* <button className='load-more' onClick={() => getAllPokemon()}>Load More</button> */}
      </div>
    </div>
  )
}

export default App;
