'use client'
import { useFavorites } from '../context/FavoritesContext'
import Link from 'next/link'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Favorite Pokémons</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4">You haven't favorited any Pokémons yet!</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Browse Pokémons
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map(id => (
            <Link key={id} href={`/pokemon/${id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={`Pokemon ${id}`}
                  className="w-24 h-24 mx-auto"
                />
                <p className="mt-2">#{id}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}