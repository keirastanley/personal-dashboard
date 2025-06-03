/** @jsxImportSource @emotion/react */
import React, {
  AnchorHTMLAttributes,
  ComponentProps,
  HTMLAttributes,
} from "react";
import "./index.css";
import { css } from "@emotion/react";
import { pages } from "./constants";

const pageColours = {
  [pages.tasks]: "#ecf5f4",
  [pages.goals]: "#eeecf5",
  [pages.favourites]: "#f5ecf0",
  [pages.ideas]: "#f5eeec",
  [pages.poetry]: "#f5f4ec",
  [pages.gallery]: "#edf5ec",
};

const pagesObj = Object.values(pages)
  .slice(1)
  .map((href) => ({
    name: href.slice(0, 1).toUpperCase() + href.slice(1),
    href: href,
    colour: pageColours[href],
  }));

interface MobileLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
      <a {...props}>{children}</a>
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
    {/* <div
      css={css`
        width: 80%;
      `}
    >
      <Gallery />
    </div> */}
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {pagesObj.map(({ name, href, colour }) => (
        <MobileLink href={href} backgroundColor={colour} key={href}>
          {name}
        </MobileLink>
      ))}
    </div>
    {/* <Poetry /> */}
  </main>
);
