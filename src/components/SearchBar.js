export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm search-glow"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search Pokémon"
      />
    </div>
  );
} 