'use client'
import { createContext, useState } from 'react';

export const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [comparisonList, setComparisonList] = useState([]);

  const addToComparison = (pokemon) => {
    if (comparisonList.length < 3 && !comparisonList.some(p => p.id === pokemon.id)) {
      setComparisonList([...comparisonList, pokemon]);
    }
  };

  const removeFromComparison = (id) => {
    setComparisonList(comparisonList.filter(p => p.id !== id));
  };

  return (
    <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
}