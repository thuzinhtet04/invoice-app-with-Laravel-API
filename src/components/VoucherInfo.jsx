import React from "react";
import { tailspin } from "ldrs";
import toast from "react-hot-toast";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { createVoucher } from "../Api/Services";
import useRecordStore from "../Store/useRecordStore";
import { useNavigate } from "react-router-dom";
import reactUseCookie from "react-use-cookie";

tailspin.register();
const VoucherInfo = () => {
  const nav = useNavigate();
  const [token] = reactUseCookie("my-token");
  const voucherFormSchema = z.object({
    voucher_id: z.string().max(20, "too long voucher ID"),
    customer_name: z.string().min(1, "you need to fill name"),
    customer_email: z
      .string()
      .email("please fill email type")
      .min(1, "you need to fill email"),
    sale_date: z.string().min(1, "you need to fill date"),
    all_correct: z.boolean().refine((val) => val === true, {
      message: "you need to check this before you submit ",
    }),
    goVoucher: z.boolean(),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(voucherFormSchema) });

  function generateInvoiceNumber() {
    // Get the current date
    const date = new Date();

    // Format the date as YYYYMMDD
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Combine the formatted date and the random number
    const invoiceNumber = `INV-${formattedDate}-${randomNumber}`;

    return invoiceNumber;
  }

  const {
    trigger,
    isMutating,
    data: resData,
  } = useSWRMutation(
    import.meta.env.VITE_BASE_URL + "/vouchers",
    createVoucher
  );
  const { records, resetRecord } = useRecordStore();
  console.log(records, "records");
  //need to get data for voucher
  const onSubmit = async (data) => {
    const total = records.reduce((a, b) => a + b.cost, 0);
    const tax = total * 0.07;
    const net_total = total + tax;
    const currentVoucher = {
      ...data,
      records,
      total,
      tax,
      net_total,
    };
    const res = await trigger({ currentVoucher, token });
    console.log(goVoucher, "go or not");

    if (goVoucher) nav(`/dashboard/voucher-detail/${res.data.id}`);

    reset();
    resetRecord();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="infoForm">
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className=" col-span-1">
            <div className=" mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.voucher_id ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Voucher ID
              </label>
              <input
                type="text"
                defaultValue={generateInvoiceNumber()}
                {...register("voucher_id")}
                className={`bg-gray-50 border ${
                  errors.voucher_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.voucher_id && <p>{errors.voucher_id.message}</p>}
            </div>
          </div>
          <div className=" col-span-1">
            <div className=" mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Name
              </label>
              <input
                type="text"
                {...register("customer_name", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.customer_name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.customer_name && <p>{errors.customer_name.message}</p>}
            </div>
          </div>
          <div className=" col-span-1">
            <div className=" mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_email ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Email
              </label>
              <input
                type="text"
                {...register("customer_email", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.customer_email
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.customer_email && <p>{errors.customer_email.message}</p>}
            </div>
          </div>
          <div className=" col-span-1">
            <div className=" mb-5">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.sale_date ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Sale Date
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                // defaultValue={"2022-01-01"}
                {...register("sale_date", {
                  required: true,
                })}
                className={`bg-gray-50 border ${
                  errors.sale_date
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {errors.sale_date && <p>{errors.sale_date.message}</p>}
            </div>
          </div>
        </div>
      </form>
      <SaleForm />

      <VoucherTable />

      <div className=" flex justify-end items-center gap-3">
        <div className="flex items-center">
          <input
            {...register("all_correct")}
            form="infoForm"
            id="all-correct"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.all_correct && (
            <p className=" text-red-400 italic ">
              {errors.all_correct.message}
            </p>
          )}
          <label
            htmlFor="all-correct"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Make sure all field are correct
          </label>
          <input
            {...register("goVoucher")}
            form="infoForm"
            id="goVoucher"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          {errors.goVoucher && (
            <p className=" text-red-400 italic ">{errors.goVoucher.message}</p>
          )}

          <label
            htmlFor="goVoucher"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            wanna go to voucher datail page
          </label>
        </div>

        <button
          type="submit"
          form="infoForm"
          className="text-white bg-blue-700 inline-flex gap-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Confirm Voucher</span>
          {isMutating && (
            <l-tailspin
              size="20"
              stroke="5"
              speed="0.9"
              color="white"
            ></l-tailspin>
          )}
        </button>
      </div>
    </div>
  );
};

export default VoucherInfo;
