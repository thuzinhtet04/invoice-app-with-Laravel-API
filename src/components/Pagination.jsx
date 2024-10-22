import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage =1, totalPages = 3  , updateFetchUrl  , links , module }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center space-x-2 mt-3" aria-label="Pagination">
      <button
        onClick={() => updateFetchUrl(links.prev)}
        disabled={!links?.prev}
        className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <FaChevronLeft className="h-4 w-4" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => updateFetchUrl(`https://voucher-app-api.ygnsh.com/api/v1/${module}?sort_by=id&sort_direction=desc&limit=5&page=${number}`)}
          className={`px-4 py-2 rounded-md border ${
            currentPage === number
              ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          aria-label={`Page ${number}`}
          aria-current={currentPage === number ? 'page' : undefined}
        >
       
          {number}
        </button>
      ))}
      <button
        onClick={() => updateFetchUrl(links.next)}
        disabled={!links?.next}
        className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <FaChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;