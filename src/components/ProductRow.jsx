import React from "react";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import "ldrs/leapfrog";
import useSWRMutation from "swr/mutation";
import { deleteProduct } from "../Api/Services";
import { Link } from "react-router-dom";
import ShowDate from "./ShowDate";
import toast from "react-hot-toast";
import { mutate } from "swr";

const ProductRow = ({ product: { id, product_name, created_at, updated_at, price } , ...props }) => {

  const { trigger, isMutating } = useSWRMutation(
    import.meta.env.VITE_BASE_URL + "/products",
    deleteProduct,

  );

  const handleDeleteBtn = async() => {
  await  trigger(id );
  await mutate( import.meta.env.VITE_BASE_URL + "/products")
    toast.success("delete successfully")
  };

  return (
    <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {product_name}
      </th>

      <td className="px-6 py-4">${price}</td>
      <td className="px-6 py-4 text-right text-nowrap">
        <ShowDate date={created_at} />
      </td>
      <td className="px-6 py-4 text-right text-nowrap">
        <ShowDate date={updated_at} />
      </td>


      <td className="px-6 py-4 text-right">
        <div className="flex gap-2 group justify-end items-center">
          <Link
            to={`/products/edit/${id}`}
            className="font-medium flex items-center  hover:scale-125 text-gray-600 size-5 dark:text-blue-500 hover:underline"
          >
            <HiOutlinePencil />
          </Link>
          <button
            disabled={isMutating}
            onClick={handleDeleteBtn}
            className="flex justify-center  hover:scale-125 items-center font-medium text-red-600 size-5 dark:text-blue-500 hover:underline"
          >
            {isMutating ? (
              // Default values shown
              <l-leapfrog size="20" speed="2.5" color="black"></l-leapfrog>
            ) : (
              <HiOutlineTrash />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
