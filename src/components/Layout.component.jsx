import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
    <Container >
      <Header />
      <Outlet/>
      <Toaster
  position="top-right"

/>
      </Container>
    </>
  );
};

export default Layout;
