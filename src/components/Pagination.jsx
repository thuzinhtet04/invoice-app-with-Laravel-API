import React from "react";
import { FaChevronLeft, FaChevronRight, FaObjectGroup } from "react-icons/fa";

const Pagination = ({   meta  , goPagination , ...rest } ) => {
  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

const paginationHandler = (url) => {
  console.log(url)
  const currentUrl = new URL(url)
  const param = currentUrl.search

  const paramObj = new URLSearchParams(param)
  const objEntriesParam = Object.fromEntries(paramObj)
  console.log(objEntriesParam , "paramObj")
  // updateFetchUrl(
  //   url
  // )
  goPagination(objEntriesParam)

}
console.log(rest)

  return (
  <div className=" flex items-stretch justify-center mt-4 ">
      {meta?.links?.map( link =>       <button
        key={link.label}
        onClick={() =>  paginationHandler(link.url)
        }
        className={`px-4 py-2  disabled:cursor-not-allowed disabled:opacity-70 first:rounded-l-md last:rounded-r-md first:border-l last:border-r ${
          link.active === true
            ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            : "bg-white  text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
        disabled={!link.url}

      >
        {link.label === '&laquo; Previous' ?   (<FaChevronLeft className=" w-2" />) : link.label === "Next &raquo;" ? (<FaChevronRight className="w-2" />) : `  ${link.label}` }

      </button>)
}
</div>
  
      )}
    



export default Pagination;
