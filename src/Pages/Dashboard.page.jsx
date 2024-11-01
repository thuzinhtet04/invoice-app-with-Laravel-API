import React from "react";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiComputerDesktop,
  HiDocumentDuplicate,
} from "react-icons/hi2";
import Logout from "../components/Logout";

const DashboardPage = () => {
  return (
    <div className=" flex flex-col  gap-5 ">
      <div className="grid grid-cols-3 gap-5">
        <div className=" bg-blue-400 rounded-lg ">
          <ModuleBtn
            name="Product"
            url="/dashboard/products"
            icon={<HiCircleStack className=" size-10" />}
          />
        </div>
        <div className=" bg-blue-400 rounded-lg ">
          <ModuleBtn
            name="Sales"
            url="/dashboard/sales"
            icon={<HiComputerDesktop className=" size-10" />}
          />
        </div>{" "}
        <div className=" bg-blue-400 rounded-lg ">
          <ModuleBtn
            name="Vouchers"
            url="/dashboard/voucher"
            icon={<HiDocumentDuplicate className=" size-10" />}
          />
        </div>
        <div className=" bg-blue-400 rounded-lg ">
          <ModuleBtn
            name="Profile"
            url="/dashboard/user-profile"
            icon={<HiDocumentDuplicate className=" size-10" />}
          />
        </div>
      </div>
      <div className=" self-end inline-block  mt-auto">
        <Logout />
      </div>
    </div>
  );
};

export default DashboardPage;
