import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../Api/Services";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import toast, { Toaster } from "react-hot-toast";
import useCookie from "react-use-cookie";
import {  useUserStore } from "../Store/useUserStore";

const LoginPage = () => {
  const nav = useNavigate();
  const [token, setToken] = useCookie("my-token");

  const [userCookie, setUserCookie] = useCookie("user");
  const { setUser } = useUserStore();

  const createFormSchema = z.object({
    email: z
      .string()
      .email("please check your input should be email format")
      .min(1, "pleale fill this is not opitional "),
    password: z
      .string()
      .min(5, "your password should be at least 5 letter")
      .max(
        20,
        "your password is too long to remember for you , please use shorter password"
      ),

    remember: z.boolean().optional(),
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFormSchema),
    mode: onsubmit,
  });
  const { trigger, isMutating, error, data } = useSWRMutation(
    `${import.meta.env.VITE_BASE_URL}/login`,
    registerUser
  );

  const onLoginSubmit = async (data) => {
    const LoginData = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    const res = await trigger(LoginData);
    if ((res.status = 200)) {
      toast.success("Login successfully");
      setToken(res.token);
      setUserCookie(JSON.stringify( res.user));
      setUser(res.user);
console.log(res.token)
      nav("/dashboard");
    }
  };
  if (token) {
   return <Navigate to="/dashboard" />
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          TakeMichi App
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="emailLogin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  name="email"
                  id="emailLogin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
                {errors.email && (
                  <p className=" text-red-500 italic">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="passwordLogin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="passwordLogin"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors.password && (
                  <p className=" text-red-500 italic">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      {...register("remember")}
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isMutating}
                className="w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in {isMutating && <div className=" animate-spin ">🔶</div>}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
