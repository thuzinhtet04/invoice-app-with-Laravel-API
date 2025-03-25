import React from "react";
import Container from "./Container";
import useCookie from "react-use-cookie";
import { useUserStore } from "../Store/useUserStore";

const Header = () => {
  const [userCookie] = useCookie("user");
console.log(userCookie)
  const {
    user: { name, email, profile_image },
  } = useUserStore();

  return (
    <header className="mb-5">
      <Container>
        <div className=" flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">SMART REC</h1>
            <p className=" text-stone-400 ">Invoice App</p>
          </div>
          <div className=" flex items-center gap-3">
            <img
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              className=" size-12 object-cover border-white shadow-sm rounded-full"
              alt=""
            />
            <div className="flex flex-col  ">
              <h3 className=" text-xl font-bold font-sans ">{name}</h3>
              <p className=" text-sm">{email}</p>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
