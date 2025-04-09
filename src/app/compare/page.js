'use client'
import { useSearchParams } from 'next/navigation'
import { fetchPokemonDetails } from '@/Services/pokeapi'
import { useEffect, useState, Suspense } from 'react'
import LoadingPokeball from '@/components/LoadingPokeball'

const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200 text-black",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

function CompareContent() {
  const searchParams = useSearchParams()
  const [pokemons, setPokemons] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || []
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await Promise.all(
          ids.map(id => fetchPokemonDetails(id))
        )
        setPokemons(data)
      } catch (error) {
        console.error('Error fetching pokemon data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex items-center justify-center">
        <LoadingPokeball />
      </div>
    )
  }

  if (pokemons.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex items-center justify-center">
        <p className="text-xl text-gray-700">Select at least 2 Pokémons to compare</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Pokémon Comparison</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.map(pokemon => (
          <div key={pokemon.id} className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className={`text-2xl font-semibold capitalize mb-4 text-white p-2 rounded-full inline-block ${typeColors[pokemon.types[0].type.name] || 'bg-gray-400'}`}>
              {pokemon.name}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Stat</th>
                    <th className="p-2 text-center">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.stats.map((stat, index) => (
                    <tr key={stat.stat.name} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="p-2 capitalize">{stat.stat.name.replace('-', ' ')}</td>
                      <td className="p-2 text-center">{stat.base_stat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 flex items-center justify-center">
        <LoadingPokeball />
      </div>
    }>
      <CompareContent />
    </Suspense>
  )
}