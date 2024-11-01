import React, { useRef } from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import useCookie from "react-use-cookie";
import { HiCamera } from "react-icons/hi2";
import { useUserStore } from "../Store/useUserStore";

const ChangePhotoPage = () => {
  const inputFileRef = useRef();

  const [token] = useCookie("my-token");
  const [userCookie, setUserCookie] = useCookie("user");
  const {
    user: { profile_image, email, name },
    setUser,
  } = useUserStore();
  console.log(userCookie, "usercookie");
  console.log(profile_image, "profile image");
  const handleImageUploader = () => {
    inputFileRef.current.click();
  };
  const handleUpdateImage = async (e) => {
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("profile_image", e.target.files[0]);
    const res = await fetch(
      import.meta.env.VITE_BASE_URL + "/user-profile/change-profile-image",
      {
        method: "POST",
        body: formData,
        headers: {
          //   "Content-Type": "application/json",
          //   "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    console.log(json);
    if (res.status === 200) {
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
    } else {
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
          <div className=" relative inline-block">
            <img
              className=" size-32 object-cover rounded-lg"
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="user photo"
            />

            <button
              onClick={handleImageUploader}
              className=" absolute  bottom-0 right-0  translate-x-1/3 translate-y-1/3 size-6 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-200"
            >
              <HiCamera />
            </button>
          </div>

          <form

            // onSubmit={handleSubmit(handleUpdateImage)}
            className=" flex gap-5 items-end "
          >
            <input
              onChange={handleUpdateImage}
              ref={inputFileRef}
              name="profile_image"
              className="hidden"
              id="profile_image"
              type="file"
              required
            />
          </form>
        </div>
      </Container>
    </section>
  );
};

export default ChangePhotoPage;
