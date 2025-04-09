export default function Pagination({ currentPage, onPageChange }) {
  return (
    <div className="flex justify-center mt-8">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-l-md border border-gray-300 ${
          currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        Previous
      </button>
      <span className="px-4 py-2 border-t border-b border-gray-300">
        Page {currentPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-r-md border border-gray-300 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
} 