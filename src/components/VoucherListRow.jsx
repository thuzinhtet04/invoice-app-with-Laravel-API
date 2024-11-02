import React from "react";
import ShowDate from "./ShowDate";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import useSWRMutation from "swr/mutation";
import { deleteVoucher } from "../Api/Services";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

const VoucherListRow = ({
  voucher: { customer_name, voucher_id, customer_email, sale_date, total, id },
}) => {
  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_BASE_URL}/vouchers`,
    deleteVoucher
  );
  const handleDeleteVoucher = () => {
    trigger(id);
    toast.success("you delete voucher successfully ");
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4">{voucher_id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium  whitespace-nowrap flex flex-col justify-center dark:text-white"
      >
        <span className="font-bold text-gray-900">{customer_name}</span>
        <span className=" text-sm">{customer_email}</span>
      </th>

      <td  className="px-6 py-4 font-medium  whitespace-nowrap text-right dark:text-white">
      {total}
    </td>

      <td className="px-6 py-4 text-right text-nowrap">
        <ShowDate date={sale_date} />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end">
          <Link
            to={`/dashboard/voucher-detail/${id}`}
            className="font-medium size-10 flex justify-center items-center text-blue-600 p-1 dark:text-blue-500 border rounded-l-md"
          >
            <HiOutlineArrowRight />
          </Link>
          <button
            onClick={handleDeleteVoucher}
            className="font-medium size-10 flex justify-center items-center text-red-600 p-1 dark:text-blue-500  border rounded-r-md "
          >
            <HiOutlineTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default VoucherListRow;
