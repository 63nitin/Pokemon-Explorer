import Link from "next/link";
import Image from "next/image";
import { ScaleIcon, HeartOutlineIcon, HeartFilledIcon } from './Icons';

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

export default function PokemonCard({ 
  pokemon, 
  isFavorite, 
  isInComparison, 
  canAddToCompare, 
  onToggleFavorite, 
  onToggleComparison 
}) {
  return (
    <div className="relative group">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite(pokemon.id);
        }}
        className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-600 transition-transform duration-200 group-hover:scale-110"
        aria-label={isFavorite ? `Unfavorite ${pokemon.name}` : `Favorite ${pokemon.name}`}
      >
        {isFavorite ? (
          <HeartFilledIcon className="w-6 h-6 drop-shadow-sm" />
        ) : (
          <HeartOutlineIcon className="w-6 h-6 opacity-70 group-hover:opacity-100" />
        )}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleComparison(pokemon);
        }}
        className={`absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs flex items-center gap-1 transition-all duration-200 group-hover:scale-105 shadow-sm ${
          isInComparison ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${!isInComparison && !canAddToCompare ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isInComparison && !canAddToCompare}
        aria-label={isInComparison ? `Remove ${pokemon.name} from comparison` : `Add ${pokemon.name} to comparison`}
      >
        <ScaleIcon className="w-3 h-3" />
        <span>{isInComparison ? 'Comparing' : 'Compare'}</span>
      </button>
      <Link href={`/pokemon/${pokemon.name}`} legacyBehavior>
        <a className="block bg-gradient-to-br from-blue-100 to-purple-400 rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.03] h-full overflow-hidden search-glow">
          <div className="w-24 h-24 mx-auto mb-2 flex items-center justify-center">
            {pokemon.image ? (
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={96}
                height={96}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                ?
              </div>
            )}
          </div>
          <p className="font-semibold capitalize text-gray-700">
            #{String(pokemon.id).padStart(3, '0')} {pokemon.name}
          </p>
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`text-white text-xs px-2 py-1 rounded-full capitalize shadow-sm ${
                  typeColors[type] || 'bg-gray-400'
                }`}
              >
                {type}
              </span>
            ))}
          </div>
        </a>
      </Link>
    </div>
  );
} 