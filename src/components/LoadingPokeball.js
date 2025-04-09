// components/LoadingPokeball.js
import React, { useState, useEffect } from 'react';

export default function LoadingPokeball() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a timeout to show content after 3 seconds
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 50000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-800 to-purple-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 opacity-20 animate-pulse-bg"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-500 opacity-20 animate-pulse-bg delay-1000"></div>

      {/* Spinning Poké Ball */}
      {showContent && (
        <div className="animate-spin w-24 h-24 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full bg-red-600 border-4 border-gray-100"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1/2 bg-white rounded-b-full border-b-4 border-gray-100"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-100"></div>
        </div>
      )}

      {/* Loading Text */}
      {showContent && (
        <p className="text-2xl font-semibold text-gray-200 mt-6">
          Searching for Pokémon...
        </p>
      )}

      {/* CSS Animation Styles (Inline for Simplicity) */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-bg {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-spin {
          animation: spin 2s linear infinite;
        }

        .animate-pulse-bg {
          animation: pulse-bg 4s linear infinite;
        }
      `}</style>
    </div>
  );
}