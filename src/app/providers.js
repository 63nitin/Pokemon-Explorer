'use client'
import { FavoritesProvider } from './context/FavoritesContext'
import { ComparisonProvider } from './context/ComparisonContext'

export function Providers({ children }) {
  return (
    <FavoritesProvider>
      <ComparisonProvider>
        {children}
      </ComparisonProvider>
    </FavoritesProvider>
  )
}