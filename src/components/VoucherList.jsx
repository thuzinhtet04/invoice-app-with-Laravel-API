import React, { useRef, useState } from "react";
import {
  HiChevronDoubleDown,
  HiChevronDoubleUp,
  HiSearch,
  HiX,
} from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetcher } from "../Api/Services";
import VoucherListRow from "./VoucherListRow";
import useSWR from "swr";
import { debounce } from "lodash";
import ProductSkeletonLoader from "./ProductSkeletonLoader";
import Pagination from "./Pagination";

const VoucherList = () => {
  const [url, setUrl] = useState(`${import.meta.env.VITE_BASE_URL}/vouchers`);
  const [searchParam, setSearchParam] = useSearchParams();
  const [search, setSearch] = useState(searchParam.get("q"));

  console.log(Object.fromEntries(searchParam.entries()));
  const searchRef = useRef("");
  const param = Object.fromEntries(searchParam.entries());
  const strParam = new URLSearchParams(param).toString();
  console.log(strParam);
  const { data, isLoading } = useSWR(
    url + "?" + strParam,

    fetcher
  );

  const handleSearch = (e) => {
    const debouceFun = debounce(() => {
      setSearch(e.target.value);

      if (e.target.value) {
        setSearchParam({
          ...Object.fromEntries(searchParam),
          q: e.target.value,
        });
      } else {
        setSearch("");
        setSearchParam({});
      }

      // setUrl(`${import.meta.env.VITE_BASE_URL}/vouchers?q=${e.target.value}`);
    }, 500);
    debouceFun();
  };

  const goPagination = (paramObj) => {
    setSearchParam(paramObj);
    console.log("you update the URL bar");
  };
  const clearSearchHandler = () => {
    setSearch("");
    searchRef.current.value = "";
    // setUrl(`${import.meta.env.VITE_BASE_URL}/vouchers`);
    setSearchParam({});
  };
  const updateFetchUrl = (url) => {
    setUrl(url);
  };
  const handleSort = (sortBy, direction) => {
    setSearchParam({
      ...Object.fromEntries(searchParam),
      sort_by: sortBy,
      sort_direction: direction,
    });
  };

  return (
    <div>
      <div className="flex  justify-between mb-3">
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <HiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            ref={searchRef}
            onChange={handleSearch}
            defaultValue={search ? searchParam.get("q") : ""}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search voucher..."
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
          to={"/dashboard/sales"}
          className="p-2.5 ms-2 text-sm flex items-center gap-3 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Sale
          <HiComputerDesktop />
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
                <span>ID</span>
              </th>
              <th scope="col" className="px-6 py-3 ">
                <span> Voucher ID</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 flex items-end justify-end gap-3 "
              >
                <div className=" flex flex-col">
                  <button
                    className=" hover:bg-gray-300"
                    onClick={handleSort.bind(null, "total", "desc")}
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
                <span>Total</span>
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-right whitespace-nowrap"
              >
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
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
            {!isLoading && data?.data?.length == 0 ? (
              <tr className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ">
                <td colSpan={5} className="px-6  text-center py-4 ">
                  There is no Voucher
                </td>
              </tr>
            ) : (
              ""
            )}
            {data?.data?.map((voucher) => (
              <VoucherListRow key={voucher.voucher_id} voucher={voucher} />
            ))}
          </tbody>
        </table>
        <Pagination goPagination={goPagination} meta={data?.meta} />
      </div>
    </div>
  );
};

export default VoucherList;
