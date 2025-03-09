import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";
import { Toaster } from "react-hot-toast";
import useCookie from "react-use-cookie";
import { useUserStore } from "../Store/useUserStore";


const Layout = () => {
  const [token] = useCookie("my-token")
  const [rememberCookie] = useCookie("remember")
  const {user, setUser} = useUserStore()
  const [userCookie] = useCookie("user")

  useEffect( () => {
    // setUser( JSON.parse(userCookie))
    console.log("update user store")
  }, [])

  // if(!token & !rememberCookie) return <Navigate to="/" />
  return (
    <>
    <Container >
      <Header />
      <Outlet/>

      </Container>
    </>
  );
};

export default Layout;
