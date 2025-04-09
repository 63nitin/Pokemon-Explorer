import PokemonCard from './PokemonCard';

export default function PokemonList({ 
  pokemonList, 
  favorites, 
  comparisonList, 
  onToggleFavorite, 
  onToggleComparison 
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {pokemonList.length > 0 ? (
        pokemonList.map((pokemon) => {
          const isFavorite = favorites.includes(pokemon.id);
          const isInComparison = comparisonList.some(p => p.id === pokemon.id);
          const canAddToCompare = comparisonList.length < 3;

          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={isFavorite}
              isInComparison={isInComparison}
              canAddToCompare={canAddToCompare}
              onToggleFavorite={onToggleFavorite}
              onToggleComparison={onToggleComparison}
            />
          );
        })
      ) : (
        <p className="col-span-full text-center text-gray-500 mt-10">
          No Pokémon found.
        </p>
      )}
    </div>
  );
} 