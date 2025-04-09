'use client'
import { useFavorites } from '../context/FavoritesContext'
import Link from 'next/link'
import Image from 'next/image'
import { fetchPokemonDetails } from '@/Services/pokeapi'
import { useState, useEffect } from 'react'

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

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length > 0) {
        const details = await Promise.all(
          favorites.map(id => fetchPokemonDetails(id))
        );
        setFavoritePokemons(details);
      } else {
        setFavoritePokemons([]);
      }
    };
    loadFavorites();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Favorite Pokémons</h1>

      {favoritePokemons.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4 text-gray-700">You haven&apos;t favorited any Pokémons yet!</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Browse Pokémons
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoritePokemons.map((pokemon, index) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.name}`} className="transition-transform duration-300 hover:scale-105">
              <div className="bg-white rounded-2xl shadow-lg p-4 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-32 h-32 mx-auto mb-2 relative">
                  <Image
                    src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                    alt={`Pokemon ${pokemon.name}`}
                    layout="fill"
                    objectFit="contain"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <p className="font-semibold capitalize text-gray-700">
                  #{String(pokemon.id).padStart(3, '0')} {pokemon.name}
                </p>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`text-white text-xs px-2 py-1 rounded-full capitalize shadow-sm ${typeColors[type.type.name] || 'bg-gray-400'}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}