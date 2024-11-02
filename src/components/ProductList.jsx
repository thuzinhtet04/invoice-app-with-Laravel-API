import React, { useEffect, useRef, useState } from "react";
import { HiChevronDoubleUp,HiChevronDoubleDown, HiSearch, HiX } from "react-icons/hi";

import useSWR from "swr";
import { fetcher } from "../Api/Services";
import { HiPlus } from "react-icons/hi2";

import ProductRow from "./ProductRow";
import ProductSkeletonLoader from "./ProductSkeletonLoader";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import Pagination from "./Pagination";
import useCookie from "react-use-cookie";

const ProductList = () => {

  const [searchParam, setSearchParam] = useSearchParams();
  console.log(Object.fromEntries(searchParam.entries()));

  const param = Object.fromEntries(searchParam.entries());
  const strParam = new URLSearchParams(param).toString();
  console.log(strParam);

  const [url, setUrl] = useState(
    import.meta.env.VITE_BASE_URL + "/products" 
  );
  const [search, setSearch] = useState(searchParam.get("q"));

  const ref = useRef("");

  const [token] = useCookie("my-token");
  
console.log(Object.fromEntries(searchParam))
  const { data, isLoading, isFetching } = useSWR(url + "?" + strParam, fetcher);
  const handleSearch = (e) => {
    const debouceFun = debounce(() => {
      console.log("helo");
      setSearch(e.target.value);

      if (e.target.value) {
        setSearchParam({ ...Object.fromEntries(searchParam) , q : e.target.value} );
      } else {
        setSearch("");
        setSearchParam({} );
      }

      // setUrl(`${import.meta.env.VITE_BASE_URL}/vouchers?q=${e.target.value}`);
    }, 500);
    debouceFun();
  };

  const clearSearchHandler = () => {
    setSearch("");
    ref.current.value = null;
    setSearchParam({});
  };
  const updateFetchUrl = (url) => {
    setUrl(url);
  };
  const goPagination = (paramObj) => {
    setSearchParam(paramObj);
    console.log("you update the URL bar");
  };
  const handleSort = (sortBy, direction) => {

    setSearchParam( { ...Object.fromEntries(searchParam) ,   sort_by: sortBy, sort_direction: direction });
  };

  console.log(data);
  return (
    <div>
      <div className="flex  justify-between mb-3">
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            ref={ref}
            onChange={handleSearch}
            defaultValue={search ? searchParam.get("q") : ""}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Product..."
          />
          {search && (
            <div
              onClick={clearSearchHandler}
              className=" absolute  right-2 top-0 bottom-0 m-auto"
            >
              <HiX fill="red" className=" h-full" />
            </div>
          )}
        </div>
        <Link
          to="/dashboard/products/create"
          className="p-2.5 ms-2 text-sm flex items-center gap-3 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add New Product
          <HiPlus />
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 flex items-end gap-3">
                <div className=" flex flex-col">
                  <button
                    className=" hover:bg-gray-300"
                    onClick={handleSort.bind(null, "id", "desc")}
                  >
                    <HiChevronDoubleUp />
                  </button>
                  <button
                    className=" hover:bg-gray-300"
                    onClick={handleSort.bind(null, "id", "asc")}
                  >
                    <HiChevronDoubleDown />
                  </button>
                </div>
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 flex items-end gap-3">
              <div className=" flex flex-col">
                  <button
                    className=" hover:bg-gray-300"
                    onClick={handleSort.bind(null, "price", "desc")}
                  >
                    <HiChevronDoubleUp />
                  </button>
                  <button
                    className=" hover:bg-gray-300"
                    onClick={handleSort.bind(null, "price", "asc")}
                  >
                    <HiChevronDoubleDown />
                  </button>
                </div>
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right whitespace-nowrap"
              >
                Created at
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right whitespace-nowrap"
              >
                Update at
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <>
                {Array.from({ length: 5 }, (_, index) => index + 1).map(
                  (el) => (
                    <ProductSkeletonLoader key={el} />
                  )
                )}
              </>
            )}
            {data?.data &&
              data?.data?.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}

            {data?.data?.length == 0 && !isLoading && (
              <tr className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                <td colSpan={5} className="px-6  text-center py-4 ">
                  There is no Product
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        goPagination={goPagination}
 
        meta={data?.meta}
      />
    </div>
  );
};

export default ProductList;
