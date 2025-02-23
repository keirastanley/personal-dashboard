/** @jsxImportSource @emotion/react */
import Nav from "../Components/Nav bar/index";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

export const Root = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
      `}
    >
      <Nav />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};
