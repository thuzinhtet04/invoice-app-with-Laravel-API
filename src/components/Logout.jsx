import React from "react";
import { removeCookie } from "react-use-cookie";

import { useNavigate } from "react-router-dom";
import { remove } from "lodash";

const Logout = () => {
  const nav = useNavigate();

  const Logouthandler = () => {
    console.log("loutout");
    removeCookie("my-token");
    removeCookie("user");
    removeCookie("remember")

    nav("/");
  };
  return (
    <button
      onClick={Logouthandler}
      className="border border-gray-600 bg-red-400 text-white py-1 px-2 rounded-md"
    >
      Logout
    </button>
  );
};

export default Logout;
