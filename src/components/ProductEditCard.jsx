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
  console.log(data, "edit");
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

// Default values shown

// import React, { useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import api from "../Api/axiosInstance";
// import { tailspin } from "ldrs";
// import useSWR, { useSWRConfig } from "swr";
// import toast from "react-hot-toast";
// import useCookie from "react-use-cookie";

// tailspin.register();

// const ProductEditCard = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [token, setToken] = useCookie("my-token");

//   const fetcher = async(url) => {
//     console.log(url);

//     const res = await fetch(url , {
//       headers :{
//         Authorization : `Bearer ${token}`
//       }
//     })
//     return res.json()
//   };

//   const { id } = useParams();

//   const { data, isLoading, error } = useSWR( import.meta.env.VITE_BASE_URL + `/products/${id}`, fetcher);

//   const { mutate } = useSWRConfig();

//   const [isUpdating, setIsUpdating] = useState(false);

//   const nav = useNavigate();

//   const editFormHandle = async (data) => {
//     setIsUpdating(true);
//     const res = await fetch( import.meta.env.VITE_BASE_URL+ `/products/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         product_name: data.product_name,
//         price: data.price,
//         created_at: new Date().toISOString(),
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const json = await res.json();
//     mutate( import.meta.env.VITE_BASE_URL + `/products/${id}`);
//     setIsUpdating(false);
//     if (res.status === 200) {
//       nav("/dashboard/products");
//       toast.success(json.message);
//     } else {
//       toast.error(json.message);
//     }
//   };

//   return (
//     // <div className="  rounded-lg w-full md:w-1/2">
//     //   <h1 className=" text-3xl font-bold mb-3">Edit Product</h1>
//     //   <p className=" mb-10 text-stone-500">
//     //     Lorem ipsum dolor sit amet consectetur adipisicing elit. At alias
//     //     necessitatibus quos earum itaque.
//     //   </p>

//     //   {isLoading ? (
//     //     <div>
//     //       <div className="mb-5 animate-pulse">
//     //         <label
//     //           htmlFor="first_name"
//     //           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     //         >
//     //           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
//     //         </label>
//     //         <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//     //           <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
//     //         </div>
//     //         <div className="text-red-500 text-sm mt-1">
//     //           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//     //         </div>
//     //       </div>

//     //       <div className="mb-8 animate-pulse">
//     //         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//     //           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
//     //         </label>
//     //         <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//     //           <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
//     //         </div>
//     //         <div className="text-red-500 text-sm mt-1">
//     //           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//     //         </div>
//     //       </div>

//     //       <div className="flex items-center mb-4 animate-pulse">
//     //         <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
//     //         <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//     //           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
//     //         </label>
//     //       </div>

//     //       <div className="flex items-center mb-4 animate-pulse">
//     //         <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
//     //         <label
//     //           htmlFor="back-to-product-list"
//     //           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//     //         >
//     //           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
//     //         </label>
//     //       </div>

//     //       <div className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
//     //         <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
//     //       </div>

//     //       <div className="text-white bg-blue-700 inline-flex gap-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//     //         <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
//     //       </div>
//     //     </div>
//     //   ) : (
//     //     <form onSubmit={handleSubmit(handleUpdateProduct)}>
//     //       <div className=" mb-5">
//     //         <label
//     //           htmlFor="first_name"
//     //           className={`block mb-2 text-sm font-medium ${
//     //             errors.product_name ? "text-red-500" : "text-gray-900"
//     //           } dark:text-white`}
//     //         >
//     //           Product Name
//     //         </label>
//     //         <input
//     //           type="text"
//     //           {...register("product_name", {
//     //             required: true,
//     //             minLength: 3,
//     //             maxLength: 30,
//     //           })}
//     //           defaultValue={data?.data?.product_name}
//     //           className={`bg-gray-50 border ${
//     //             errors.product_name
//     //               ? "border-red-500 focus:ring-red-500 focus:border-red-500"
//     //               : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//     //           } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//     //           placeholder="eg. apple"
//     //         />
//     //         {errors.product_name?.type === "required" && (
//     //           <p className=" text-red-500 text-sm mt-1">
//     //             Product name is required
//     //           </p>
//     //         )}
//     //         {errors.product_name?.type === "minLength" && (
//     //           <p className=" text-red-500 text-sm mt-1">
//     //             Product name must be greater than 3 characters
//     //           </p>
//     //         )}
//     //         {errors.product_name?.type === "maxLength" && (
//     //           <p className=" text-red-500 text-sm mt-1">
//     //             Product name must be less than 10 characters
//     //           </p>
//     //         )}
//     //       </div>
//     //       <div className=" mb-8">
//     //         <label
//     //           htmlFor="last_name"
//     //           className={`block mb-2 text-sm font-medium ${
//     //             errors.price ? "text-red-500" : "text-gray-900"
//     //           } dark:text-white`}
//     //         >
//     //           Product Price
//     //         </label>
//     //         <input
//     //           type="number"
//     //           {...register("price", {
//     //             required: true,
//     //             min: 100,
//     //             max: 10000,
//     //           })}
//     //           defaultValue={data?.data?.price}
//     //           className={`bg-gray-50 border ${
//     //             errors.price
//     //               ? "border-red-500 focus:ring-red-500 focus:border-red-500"
//     //               : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//     //           } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//     //           placeholder="eg. 500"
//     //         />
//     //         {errors.price?.type === "required" && (
//     //           <p className=" text-red-500 text-sm mt-1">
//     //             Product price is required
//     //           </p>
//     //         )}
//     //         {errors.price?.type === "min" && (
//     //           <p className=" text-red-500 text-sm mt-1">
//     //             Product price must be greater than 100 characters
//     //           </p>
//     //         )}
//     //         {errors.price?.type === "max" && (
//     //           <p className=" text-red-500 text-sm mt-1">
//     //             Product price must be less than 10000 characters
//     //           </p>
//     //         )}
//     //       </div>

//     //       <div className="flex items-center mb-4">
//     //         <input
//     //           {...register("all_correct")}
//     //           required
//     //           id="all-correct"
//     //           type="checkbox"
//     //           value=""
//     //           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//     //         />
//     //         <label
//     //           htmlFor="all-correct"
//     //           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//     //         >
//     //           Make sure all field are correct
//     //         </label>
//     //       </div>

//     //       <div className="flex items-center mb-4">
//     //         <input
//     //           {...register("back_to_product_list")}
//     //           id="back-to-product-list"
//     //           type="checkbox"
//     //           value=""
//     //           checked
//     //           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//     //         />
//     //         <label
//     //           htmlFor="back-to-product-list"
//     //           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//     //         >
//     //           Back to Product List after saving
//     //         </label>
//     //       </div>

//     //       <Link
//     //         to="/product"
//     //         className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//     //       >
//     //         Cancel
//     //       </Link>

//     //       <button
//     //         type="submit"
//     //         className="text-white bg-blue-700 inline-flex gap-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//     //       >
//     //         <span>Update Product</span>
//     //         {isSending && (
//     //           <l-tailspin
//     //             size="20"
//     //             stroke="5"
//     //             speed="0.9"
//     //             color="white"
//     //           ></l-tailspin>
//     //         )}
//     //       </button>
//     //     </form>
//     //   )}
//     // </div>
//     <div className=" w-full md:w-1/2 border rounded-lg p-5">
//       <h1 className=" text-xl font-bold">Edit Product</h1>
//       <p className=" text-stone-500 text-sm">
//         You can easily update your product name and price.
//       </p>

//       {isLoading ? (
//         <div className="mt-5">
//           <div>
//             <div className="skeleton-loader h-4 w-40 rounded mb-2"></div>
//             <div className="skeleton-loader h-10 rounded-lg mb-2"></div>
//           </div>

//           <div className="mt-3">
//             <div className="skeleton-loader h-4 w-40 rounded mb-2"></div>
//             <div className="skeleton-loader h-10 rounded-lg mb-2"></div>
//           </div>

//           <div className="flex items-center mt-3">
//             <div className="skeleton-loader w-4 h-4 rounded mr-2"></div>
//             <div className="skeleton-loader h-4 w-40 rounded"></div>
//           </div>

//           <div className="flex items-center mt-3">
//             <div className="skeleton-loader w-4 h-4 rounded mr-2"></div>
//             <div className="skeleton-loader h-4 w-60 rounded"></div>
//           </div>

//           <div className="mt-3">
//             <div className="inline-block skeleton-loader h-10 w-32 rounded-lg mr-2"></div>
//             <div className="inline-block skeleton-loader h-10 w-32 rounded-lg"></div>
//           </div>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit(editFormHandle)} className=" mt-5">
//           <div>
//             <label
//               htmlFor="product_name"
//               className={`block mb-1 text-sm font-medium ${
//                 errors.product_name ? "text-red-500" : "text-gray-900"
//               } dark:text-white`}
//             >
//               Edit Product Name
//             </label>
//             <input
//               {...register("product_name", {
//                 required: true,
//                 minLength: 3,
//                 maxLength: 50,
//               })}
//               defaultValue={data.data.product_name}
//               type="text"
//               id="product_name"
//               className={`bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg ${
//                 errors.product_name
//                   ? "focus:ring-red-500 border-red-500 focus:border-red-500"
//                   : "focus:ring-cyan-700 border-gray-300 focus:border-cyan-800"
//               } block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500`}
//               placeholder="eg.apple"
//             />
//             {errors.product_name && (
//               <span className=" text-red-500 text-xs">
//                 Product name must have minimum 3 letters
//               </span>
//             )}
//           </div>

//           <div className="mt-3">
//             <label
//               htmlFor="price"
//               className={`block mb-1 text-sm font-medium ${
//                 errors.price ? "text-red-500" : "text-gray-900"
//               } dark:text-white`}
//             >
//               Edit Product Price
//             </label>
//             <input
//               {...register("price", { required: true, min: 100, max: 20000 })}
//               defaultValue={data.data.price}
//               type="number"
//               id="price"
//               className={`bg-gray-50 border outline-none text-gray-900 text-sm rounded-lg ${
//                 errors.price
//                   ? "focus:ring-red-500 border-red-500 focus:border-red-500"
//                   : "focus:ring-cyan-700 border-gray-300 focus:border-cyan-800"
//               } block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-700 dark:focus:border-cyan-800`}
//               placeholder="eg.500"
//             />
//             {errors.price && (
//               <span className="text-red-500 text-xs">
//                 Product price must have minimum 100
//               </span>
//             )}
//           </div>

//           <div className="flex items-center mt-3">
//             <input
//               {...register("all_correct")}
//               id="all_correct"
//               type="checkbox"
//               defaultValue
//               required
//               className="w-4 h-4 text-cyan-700 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
//             />
//             <label
//               htmlFor="all_correct"
//               className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//             >
//               Make sure all fields are correct!
//             </label>
//           </div>

//           <div className="flex items-center mt-3">
//             <input
//               checked
//               {...register("after_save")}
//               id="after_save"
//               type="checkbox"
//               defaultValue
//               className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
//             />
//             <label
//               htmlFor="after_save"
//               className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//             >
//               Back to after update!
//             </label>
//           </div>

//           <div className=" mt-3">
//             <Link
//               to={"/dashboard/products"}
//               className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-500 focus:z-10 focus:ring-1 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//             >
//               Cancel
//             </Link>

//             <button
//               type="submit"
//               className="text-white inline-flex gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-1 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
//             >
//               <span>Update Product</span>
//               {isUpdating && (
//                 <l-tailspin
//                   size="20"
//                   stroke="2"
//                   speed="0.9"
//                   color="white"
//                 ></l-tailspin>
//               )}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };
