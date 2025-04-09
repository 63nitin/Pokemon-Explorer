// pages/_app.js
'use client'
import { FavoritesProvider } from '../app/context/FavoritesContext';
import { ComparisonProvider } from '../app/context/ComparisonContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <ComparisonProvider>
        <Component {...pageProps} />
      </ComparisonProvider>
    </FavoritesProvider>
  );
}