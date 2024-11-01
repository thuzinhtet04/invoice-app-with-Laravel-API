import React from "react";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import api from "../Api/axiosInstance";
import toast from "react-hot-toast";
import { getCookie, removeCookie } from "react-use-cookie";

const ChangePasswordPage = () => {
  const nav = useNavigate()
  const token = getCookie('my-token')
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: onsubmit });
  const new_password = watch("new_password");

  const passwordChangeHandler = async (data) => {
    console.log(data);
    const body = JSON.stringify(data);
    console.log(body);
    const res = await api.post(
      `${import.meta.env.VITE_BASE_URL}/user-profile/change-password`,
      
        body,
      
    );
if(res.status === 200){
  toast.success(res.data.message)
  removeCookie("my-token")
  removeCookie("user")
  nav("/")
  
}else{
  toast.error(res.data.message)
}
    reset();
  };
  return (
    <section>
      <Container>
        <Breadcrumb
          currentPage={"change password"}
          link={[{ name: "user profile", path: "/dashboard/user-profilez" }]}
        />

        <form
          onSubmit={handleSubmit(passwordChangeHandler)}
          className="space-y-4 md:space-y-6 w-1/3"
          action="#"
        >
          <div>
            <label
              htmlFor="old_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Old Password
            </label>
            <input
              {...register("old_password", {
                required: "old password need to fill",
              })}
              type="text"
              name="old_password"
              id="old_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="eg.Aung Kyaw"
            />
            {errors.old_password && (
              <p className=" text-red-500 italic">
                {errors.old_password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="new_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              {...register("new_password", { required: "need to fill" })}
              autoComplete="current-email"
              type="password"
              id="new_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
            />
            {errors.new_password && (
              <p className=" text-red-500 italic">
                {errors.new_password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="new_password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password Confirmation
            </label>
            <input
              {...register("new_password_confirmation", {
                minLength: {
                  value: 4,
                  message: "too short password",
                },
                validate: (value) =>
                  value === new_password || "password does not match",
              })}
              autoComplete="current-password"
              type="password"
              name="new_password_confirmation"
              id="new_password_confirmation"
              placeholder="asdfjkk123"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.new_password_confirmation && (
              <p className=" text-red-500 italic">
                {errors.new_password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Change Password
          </button>
        </form>
      </Container>
    </section>
  );
};

export default ChangePasswordPage;
