'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { ComparisonContext } from '../app/context/ComparisonContext';

export default function ComparisonModal() {
  const { comparisonList, removeFromComparison } = useContext(ComparisonContext);

  if (comparisonList.length < 2) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-50 max-w-xs sm:max-w-md">
      <h3 className="font-bold mb-2 text-center sm:text-left">Comparing {comparisonList.length} Pokémon</h3>
      <div className={`grid grid-cols-${comparisonList.length} gap-2 mb-4`}>
        {comparisonList.map(pokemon => (
          <div key={pokemon.id} className="relative text-center">
            <Image 
              src={pokemon.image} 
              alt={pokemon.name} 
              width={80}
              height={80}
              className="object-contain mx-auto"
            />
            <button 
              onClick={() => removeFromComparison(pokemon.id)} 
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none"
              aria-label={`Remove ${pokemon.name} from comparison`}
            >
              ×
            </button>
            <p className="text-xs mt-1 truncate capitalize">{pokemon.name}</p>
          </div>
        ))}
      </div>
      <Link 
        href={{ 
          pathname: '/compare', 
          query: { ids: comparisonList.map(p => p.id).join(',') } 
        }} 
        className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded text-center transition-colors"
      >
        Compare Now ({comparisonList.length})
      </Link>
    </div>
  );
}