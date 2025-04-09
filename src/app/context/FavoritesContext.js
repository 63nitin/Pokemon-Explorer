'use client'
import { createContext, useState, useEffect, useContext } from 'react'

export const FavoritesContext = createContext()

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('pokemon-favorites')) || []
    setFavorites(saved)
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}