import React, { useState } from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { IS_REACT_LEGACY } from "swr/_internal";
import { useUserStore } from "../Store/useUserStore";
import { HiCamera, HiLockOpen, HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useUserStore();
  const [helo, setHelo] = useState(false);
  console.log(user);
  return (
    <section>
      <Container>
        <Breadcrumb currentPage={"User-Profile"} />
        <div className="flex gap-5 items-end  ">
         

          <div className="relative border size-28 object-cover object-top bg-gray-300 rounded-md ">
            <img
              src={
                user.profile_image
                  ? user.profile_image
                  : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?ga=GA1.1.60732550.1709942337&semt=ais_hybrid"
              }
              alt=""
            />

            <Link
              to="/dashboard/user-profile/change-photo"
              className=" absolute top-0 right-0 bg-blue-200 rounded-full p-1"
            >
              <HiCamera size={12} />
            </Link>
          </div>
          <div className=" flex flex-col items-start">
            <p className="  text-sm text-gray-400 bg-gray-200 rounded-sm shadow py-0.5 px-1 inline-block">
              {" "}
              your name
            </p>
            <div className="flex gap-3 items-center">
              <h2 className=" font-bold text-lg mt-1">{user.name}</h2>
              <Link
                to="/dashboard/user-profile/change-name"
                className=" bg-blue-200 rounded-full p-1"
              >
                <HiPencilSquare size={12} />
              </Link>
            </div>
          </div>
        </div>
        <div className=" mt-3">
          <p className=" text-sm text-gray-400 bg-gray-200 rounded-sm shadow py-0.5 px-1 inline-block">
            your email
          </p>

          <h2 className=" font-bold text-lg mt-1">{user.email}</h2>
        </div>
        <Link
          to="/dashboard/user-profile/change-password"
          className=" inline-flex bg-blue-500 py-1 px-4 rounded  items-center gap-2 text-white mt-3"
        >
          <HiLockOpen /> Change Password
        </Link>
      </Container>
    </section>
  );
};

export default ProfilePage;
