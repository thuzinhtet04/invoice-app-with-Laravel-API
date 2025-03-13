import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { fetcher, updateProduct } from "../Api/Services";
import useCookie from "react-use-cookie";
import toast from "react-hot-toast";

const ProductEditCard = ({ id }) => {
  const [token] = useCookie("my-token");
  const { data, isLoading, isError } = useSWR(
    `${import.meta.env.VITE_BASE_URL}/products/${id}`,
    (url) => fetcher(url , token),
    {}
  );
  const editSchema = z.object({
    editName: z
      .string()
      .max(30, "too long")
      .min(3, "too short")
      .refine((val) => val.trim() !== "", {
        message: "your input is only space , please enter something",
      }),
    editPrice: z
      .number({ invalid_type_error: "please input number" })
      .min(100, "too cheap")
      .max(1000, "too expensive"),

    editCheck: z.boolean().refine((value) => value === true, {
      message: "you need to check the data you entered",
    }),
    gobackProduct: z.boolean(),
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(editSchema),
    mode: "onChange",
  });

  const nav = useNavigate();
  const editHandler = async (value) => {
    const updateProduct = {
      id,
      product_name: value.editName.trim(),
      price: value.editPrice,
      createat: data.createat,
    };

    const res = await trigger(updateProduct);
    reset(res.data.data);
    nav("/dashboard/products");
    toast.success("update successfully");
  };
  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_BASE_URL}/products/${id}`,
    (url, { arg }) => updateProduct(url, arg, token),
    {}
  );
  if (isLoading) return <p>Loading ...</p>;

  return (
    <form
      onSubmit={handleSubmit(editHandler)}
      className=" w-full md:w-1h/2 bg-violet-300 p-5 mt-5 rounded-md "
    >
      <div className="flex flex-col justify-center mb-4">
        <label htmlFor="createName"> Product Name</label>
        <input
          defaultValue={data.data.product_name}
          type="text"
          {...register("editName")}
          id="editName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your product name ..."
        />

        {errors.editName && (
          <p className=" text-red-400 italic">{errors.editName.message}</p>
        )}
      </div>
      <div className="flex flex-col justify-center mb-4">
        <label htmlFor="editPrice"> Product Price</label>
        <input
          {...register("editPrice", { valueAsNumber: true })}
          defaultValue={data?.data.price}
          type="number"
          id="editPrice"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your product Price ..."
        />
        {errors.editPrice && (
          <p className=" text-red-400 italic">{errors.editPrice.message}</p>
        )}
      </div>
      <div className="flex items-center mb-2">
        <input
          {...register("editCheck")}
          id="editCheck"
          type="checkbox"
          className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:border-blue-500 me-3"
        />
        {errors.editCheck && (
          <p className=" text-red-400 italic">{errors.editCheck.message}</p>
        )}
        <label htmlFor="editCheck">Make all fields are sure</label>
      </div>
      <div className="flex items-center mb-4">
        <input
          {...register("gobackProduct")}
          checked={true}
          id="gobackProduct"
          type="checkbox"
          className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:border-blue-500 me-3"
        />
        {errors.gobackProduct && (
          <p className=" text-red-400 italic">{errors.gobackProduct.message}</p>
        )}

        <label htmlFor="gobackProduct">
          Go back to products Page after create new Product
        </label>
      </div>
      <div className="">
        <Link
          className="p-2.5  ms-2 text-sm inline-flex items-center gap-3 font-medium  bg-white rounded-lg border  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          to="/products"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm inline-flex items-center gap-3 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default ProductEditCard;

