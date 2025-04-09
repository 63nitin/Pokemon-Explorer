'use client'
import { useState, useEffect, useContext } from "react";
import { fetchPokemonList, fetchPokemonDetails } from "../Services/pokeapi";
import LoadingPokeball from "@/components/LoadingPokeball";
import { FavoritesContext } from './context/FavoritesContext';
import { ComparisonContext } from './context/ComparisonContext';
import SearchBar from '@/components/SearchBar';
import PokemonList from '@/components/PokemonList'; // Assuming this renders the grid
import Pagination from '@/components/Pagination';
import ComparisonModal from '@/components/ComparisonModal';
import Link from 'next/link';

export default function Home() {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const { favorites, toggleFavorite } = useContext(FavoritesContext);
    const { comparisonList, addToComparison, removeFromComparison } = useContext(ComparisonContext);

    useEffect(() => {
        const loadPokemon = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPokemonList(itemsPerPage, (currentPage - 1) * itemsPerPage);
                const pokemonWithDetails = await Promise.all(
                    data.map(async (pokemon) => {
                        const details = await fetchPokemonDetails(pokemon.name);
                        return {
                            ...pokemon,
                            id: details.id,
                            image: details.sprites.other?.['official-artwork']?.front_default || details.sprites.front_default,
                            types: details.types.map((typeInfo) => typeInfo.type.name)
                        };
                    })
                );
                setPokemonList(pokemonWithDetails);
            } catch (error) {
                console.error("Error fetching Pokemon:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPokemon();
    }, [currentPage]);

    const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleComparison = (pokemon) => {
        if (comparisonList.some(p => p.id === pokemon.id)) {
            removeFromComparison(pokemon.id);
        } else {
            addToComparison({ id: pokemon.id, name: pokemon.name, image: pokemon.image });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
                <LoadingPokeball />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-700">Pokémon Explorer</h1>
                <Link
                    href="/favorites"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <span>Favorites</span>
                    {favorites.length > 0 && (
                        <span className="bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {favorites.length}
                        </span>
                    )}
                </Link>
            </div>

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <PokemonList
                pokemonList={filteredPokemon}
                favorites={favorites}
                comparisonList={comparisonList}
                onToggleFavorite={toggleFavorite}
                onToggleComparison={handleToggleComparison}
            />

            <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />

            <ComparisonModal />

            {/* Animation Styles - Moved here */}
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