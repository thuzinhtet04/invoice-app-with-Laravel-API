import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";
import { Toaster } from "react-hot-toast";
import useCookie from "react-use-cookie";
import { useUserStore } from "../Store/useUserStore";
import { fetcher } from "../Api/Services.js";
import { getCookie } from "react-use-cookie";

const Layout = () => {
  const [token] = useCookie("my-token")
  const {user, setUser} = useUserStore()
  const [userCookie] = useCookie("user")

  useEffect( () => {
    setUser( JSON.parse(userCookie))
    console.log("update user store")
  }, [])
  if(!token) return <Navigate to="/" />
  return (
    <>
      <Container>
        <Header />
        <Outlet />
        {/* <Toaster position="bottom-right" /> */}
      </Container>
    </>
  );
};

export default Layout;
