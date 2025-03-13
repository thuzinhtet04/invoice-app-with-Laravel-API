import React from "react";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { changeName } from "../Api/Services";
import useCookie from "react-use-cookie";
import toast from "react-hot-toast";
import { useUserStore } from "../Store/useUserStore";

const ChangeNamePage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const [token] = useCookie("my-token")
  const { user, setUser } = useUserStore();
  console.log(user);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: onsubmit,
  });
  const changeNameHandler = async (data) => {
    const res = await changeName(
      `${import.meta.env.VITE_BASE_URL}/user-profile/change-name`,
      data  , token
    );
    reset();

    if(res.status === 200 ){
    toast.success(res.data.message);
    setUserCookie(JSON.stringify(res.data.user))
    setUser(res.data.user)

    }else{
      toast.error(res.message)
    }
  };
  return (
    <section>
      <Container>
        <Breadcrumb
          link={[{ name: "User Profile", path: "/dashboard/user-profile" }]}
          currentPage={"Change Photo"}
        />

        <div className="border shadow rounded p-10">
          <form
            onSubmit={handleSubmit(changeNameHandler)}
            // onSubmit={handleSubmit(handleUpdateImage)}
            className=" flex gap-5 items-start flex-col w-3/5"
          >
            <input
              {...register("name", {
                required: "you nee name to update",
                maxLength: { value: 20, message: "too long name" },
              })}
              type="text"
              className="border-2 rounded border-gray-300 focus:border-violet-300 focus:ring-0 ring-0"
              placeholder="Enter new name"
            />
            {errors.name && (
              <p className=" text-red-300 italic">{errors.name.message}</p>
            )}

            <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {" "}
              Update
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default ChangeNamePage;
