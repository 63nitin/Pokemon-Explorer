'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPokemonDetails } from '@/Services/pokeapi'
import LoadingPokeball from '@/components/LoadingPokeball'

export default function PokemonDetail({ params }) {
  const pokemonName = use(params).name
  const [pokemon, setPokemon] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPokemonDetails(pokemonName)
        setPokemon(data)
      } catch (error) {
        console.error("Failed to load Pokemon:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [pokemonName])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex justify-center items-center">
        <LoadingPokeball/>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Pokemon not found</h2>
        <Link href="/" className="text-blue-600 hover:underline text-lg">
          ← Back to Pokedex
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-4">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block text-lg">
        ← Back to Pokedex
      </Link>
      
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-100 to-purple-400 rounded-2xl shadow-2xl p-8">
        {/* Header with name and ID */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-extrabold capitalize text-gray-800">
              {pokemon.name}
            </h1>
            <p className="text-lg text-gray-600">#{pokemon.id.toString().padStart(3, '0')}</p>
          </div>
          <button
            onClick={() => setIsShiny(!isShiny)}
            className={`px-6 py-3 rounded-full text-lg font-semibold ${
              isShiny ? 'bg-yellow-500 text-gray-800 shadow-md hover:bg-yellow-400' : 'bg-gray-800 text-white shadow-md hover:bg-gray-700'
            }`}
          >
            {isShiny ? '★ Shiny ★' : 'View Shiny'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column - Image and Types */}
          <div className="w-full md:w-1/3 ">
            <div className=" search-glow bg-gradient-to-br from-blue-300 to-purple-400 rounded-xl p-6 flex justify-center mb-6 shadow-inner">
              <Image 
                src={
                  isShiny 
                    ? pokemon.sprites.front_shiny 
                    : pokemon.sprites.other["official-artwork"].front_default || 
                      pokemon.sprites.front_default
                } 
                alt={pokemon.name}
                width={288}
                height={288}
                className="object-contain"
              />
            </div>
            
            {/* Types */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Types</h2>
              <div className="flex flex-wrap gap-3">
                {pokemon.types.map((typeInfo) => (
                  <span 
                    key={typeInfo.type.name}
                    className={`px-5 py-2 rounded-full capitalize text-lg ${
                      typeColors[typeInfo.type.name] || 'bg-gray-400'
                    } text-white shadow-md`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Abilities</h2>
              <div className="space-y-3">
                {pokemon.abilities.map((ability) => (
                  <div key={ability.ability.name} className="capitalize text-lg text-gray-700">
                    {ability.ability.name.replace('-', ' ')}
                    {ability.is_hidden && (
                      <span className="text-sm text-gray-500 ml-2">(hidden)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Stats</h2>
            <div className="space-y-5">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize text-lg text-gray-700">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="font-semibold text-lg text-gray-800">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full" 
                      style={{ 
                        width: `${Math.min(100, stat.base_stat)}%`,
                        maxWidth: '100%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Moves Section */}
            <div className="mt-10 bg-gradient-to-br from-blue-100 to-purple-400 rounded-2xl p-2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Moves ({pokemon.moves.length})
              </h2>
              <div className="flex flex-wrap gap-3 max-h-64 overflow-y-auto p-3 bg-gradient-to-br from-blue-100 to-purple-400 rounded-xl shadow-inner">
                {pokemon.moves.map((move) => (
                  <span 
                    key={move.move.name} 
                    className="bg-gray-200 px-4 py-2 rounded-full text-sm capitalize text-gray-700 shadow-sm"
                  >
                    {move.move.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add this outside your component
const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
}