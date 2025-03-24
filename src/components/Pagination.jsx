import React from "react";
import { FaChevronLeft, FaChevronRight, FaObjectGroup } from "react-icons/fa";

const Pagination = ({ updateFetchUrl, meta, ...rest }) => {
  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
console.log(goPagination)
  const paginationHandler = (url) => {
    // const currentUrl = new URL(url)
    // const param = currentUrl.search

    // const paramObj = new URLSearchParams(param)
    // const objEntriesParam = Object.fromEntries(paramObj)
    updateFetchUrl(url);
    // goPagination(objEntriesParam)
  };

  return (
    <div className=" flex items-stretch justify-center mt-4 ">
      {meta?.links?.map((link) => (
        <button
          key={link.label}
          onClick={() => paginationHandler(link.url)}
          className={`px-4 py-2  disabled:cursor-not-allowed disabled:opacity-70 first:rounded-l-md last:rounded-r-md first:border-l last:border-r ${
            link.active === true
              ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
              : "bg-white  text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          disabled={!link.url}
        >
          {link.label === "&laquo; Previous" ? (
            <FaChevronLeft className=" w-2" />
          ) : link.label === "Next &raquo;" ? (
            <FaChevronRight className="w-2" />
          ) : (
            `  ${link.label}`
          )}
        </button>
      ))}
    </div>
  );
};

// <nav className="flex items-center justify-center space-x-2 mt-3" aria-label="Pagination">
//   <button
//     onClick={() => updateFetchUrl(links.prev)}
//     disabled={!links?.prev}
//     className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//     aria-label="Previous page"
//   >
//     <FaChevronLeft className="h-4 w-4" />
//   </button>
//   {pageNumbers.map((number) => (
//     <button
//       key={number}
//       onClick={() => updateFetchUrl(`https://voucher-app-api.ygnsh.com/api/v1/${module}?sort_by=id&sort_direction=desc&limit=5&page=${number}`)}
//       className={`px-4 py-2 rounded-md border ${
//         currentPage === number
//           ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
//           : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
//       }`}
//       aria-label={`Page ${number}`}
//       aria-current={currentPage === number ? 'page' : undefined}
//     >

//       {number}
//     </button>
//   ))}
//   <button
//     onClick={() => updateFetchUrl(links.next)}
//     disabled={!links?.next}
//     className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//     aria-label="Next page"
//   >
//     <FaChevronRight className="h-4 w-4" />
//   </button>
// </nav>

export default Pagination;
