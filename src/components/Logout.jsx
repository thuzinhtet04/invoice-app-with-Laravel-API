import React from "react";
import { removeCookie } from "react-use-cookie";

import { useNavigate } from "react-router-dom";

const Logout = () => {
  const nav = useNavigate();

  const Logouthandler = () => {
    removeCookie("my-token");
    removeCookie("user");

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
