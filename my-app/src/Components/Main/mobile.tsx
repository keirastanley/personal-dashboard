/** @jsxImportSource @emotion/react */
import React, { ComponentProps } from "react";
import Gallery from "../Gallery/index";
import Poetry from "../Poetry/index";
import { Link } from "react-router-dom";
import "./index.css";
import { css } from "@emotion/react";

const pages = [
  { name: "Things to do", link: "tasks", colour: "#ecf5f4" },
  { name: "Goals", link: "goals", colour: "#eeecf5" },
  { name: "Favourites", link: "favourites", colour: "#f5ecf0" },
  { name: "Idea generator", link: "ideas", colour: "#f5eeec" },
  { name: "Reading list", link: "poetry", colour: "#f5f4ec" },
  { name: "Gallery", link: "gallery", colour: "#edf5ec" },
];

interface MobileLinkProps extends ComponentProps<typeof Link> {
  backgroundColor: string;
}

const MobileLink = ({
  backgroundColor,
  children,
  ...props
}: MobileLinkProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-grow: 1;
        background-color: ${backgroundColor};
        border: 1px solid #c4c4c4;
        width: 30%;
        height: 100px;
        justify-content: center;
      `}
    >
      <Link {...props}>{children}</Link>
    </div>
  );
};

export const Mobile = () => (
  <main
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 10px;
    `}
  >
    <div
      css={css`
        width: 80%;
      `}
    >
      <Gallery />
    </div>
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {pages.map(({ name, link, colour }) => (
        <MobileLink to={link} backgroundColor={colour} key={link}>
          {name}
        </MobileLink>
      ))}
    </div>
    <Poetry />
  </main>
);
