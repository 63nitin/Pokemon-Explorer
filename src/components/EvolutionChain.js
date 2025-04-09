'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchPokemonDetails } from '@/Services/pokeapi'

const typeColors = {
  normal: "bg-gradient-to-r from-gray-200 to-gray-300",
  fire: "bg-gradient-to-r from-red-400 to-orange-300",
  water: "bg-gradient-to-r from-blue-400 to-blue-600",
  electric: "bg-gradient-to-r from-yellow-300 to-yellow-500",
  grass: "bg-gradient-to-r from-green-300 to-green-500",
  ice: "bg-gradient-to-r from-blue-200 to-blue-300 text-black",
  fighting: "bg-gradient-to-r from-red-600 to-red-800",
  poison: "bg-gradient-to-r from-purple-400 to-purple-600",
  ground: "bg-gradient-to-r from-yellow-500 to-yellow-700",
  flying: "bg-gradient-to-r from-indigo-200 to-indigo-400",
  psychic: "bg-gradient-to-r from-pink-400 to-pink-600",
  bug: "bg-gradient-to-r from-lime-400 to-lime-600",
  rock: "bg-gradient-to-r from-yellow-600 to-yellow-800",
  ghost: "bg-gradient-to-r from-purple-600 to-purple-800",
  dragon: "bg-gradient-to-r from-indigo-500 to-indigo-700",
  dark: "bg-gradient-to-r from-gray-700 to-gray-900",
  steel: "bg-gradient-to-r from-gray-400 to-gray-600",
  fairy: "bg-gradient-to-r from-pink-200 to-pink-400",
};

export default function EvolutionChain({ evolutionChain }) {
  const [evolutions, setEvolutions] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const loadEvolutions = async () => {
      try {
        const evolutionData = await Promise.all(
          evolutionChain.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.name);
            return {
              name: pokemon.name,
              id: details.id,
              image: details.sprites.other?.['official-artwork']?.front_default || details.sprites.front_default,
              types: details.types.map((typeInfo) => typeInfo.type.name),
            };
          })
        );
        setEvolutions(evolutionData);
      } catch (error) {
        console.error('Error loading evolution data:', error);
      }
    };

    loadEvolutions();
  }, [evolutionChain]);

  useEffect(() => {
    // Animate cards on mount
    cardRefs.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          card.style.transform = 'translateX(0)';
          card.style.opacity = '1';
        }, index * 200); // Stagger animation
      }
    });
  }, [evolutions]);

  if (evolutions.length === 0) return null;

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Evolution Chain</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {evolutions.map((pokemon, index) => (
          <div
            key={pokemon.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="flex flex-col items-center transition-transform duration-500 ease-out opacity-0"
            style={{ transform: 'translateX(-50px)' }}
          >
            <Link href={`/pokemon/${pokemon.name}`} className="block">
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
                <div className={`rounded-t-2xl py-2 px-4 ${typeColors[pokemon.types[0]] || 'bg-gray-400'}`}>
                  <p className="text-center font-semibold capitalize text-white text-lg">
                    {pokemon.name}
                  </p>
                </div>
                <div className="p-4">
                  <div className="w-32 h-32 mx-auto relative">
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      width={128}
                      height={128}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center mt-2 text-gray-600">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </p>
                </div>
              </div>
            </Link>
            {index < evolutions.length - 1 && (
              <div className="flex items-center justify-center h-12">
                <div className="w-8 h-1 bg-gray-300"></div>
                <div className="w-4 h-4 border-t-2 border-r-2 border-gray-300 transform rotate-45"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}