import { useEffect, useState } from "react";

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
      <h1>Pokémon Evolution</h1>
      <div className='pokemon-containter'>
        <div className='all-container'>
          <button className='load-more'>Load More</button>
        </div>
      </div>
    </div>
  )
}

export default App;
