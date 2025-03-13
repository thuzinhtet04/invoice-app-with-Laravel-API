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
  const { user, setUser } = useUserStore();
  const [userCookie, setUserCookie] = useCookie("user");
  const token = getCookie("my-token");
  if (!token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {

    const fetchUser = async (token) => {
      const res = await fetcher(
        import.meta.env.VITE_BASE_URL + "/user-profile/profile",
        token
      );
      setUserCookie(JSON.stringify(res.data));
      setUser(res.data);
    };
    if (!userCookie) {
      fetchUser(token);
    }
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, [userCookie, token]);

  return (
    <>
      <Container>
        <Header />
        <Outlet />
        <Toaster position="bottom-right" />
      </Container>
    </>
  );
};

export default Layout;
