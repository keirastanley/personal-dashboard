/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ComponentProps } from "react";
import Weather from "../Weather/index";
import Gallery from "../Gallery/GalleryWidget";
import Poetry from "../Poetry/PoetryWidget";
import Goals from "../Goals/index";
import Ideas from "../Ideas/index";
import Favourites from "../Favourites/index";
import Tasks from "../Tasks/index";
import { Link } from "react-router-dom";
import "./index.css";
import useScreenSize from "../../hooks/useScreenSize";
import { Mobile } from "./mobile";

export const Main = () => {
  const { width } = useScreenSize();

  // if (width > 800) {
  //   return (
  //     <main
  //       css={css`
  //         display: flex;
  //         height: 100%;
  //         gap: 10px;
  //         padding: 10px;
  //       `}
  //     >
  //       <div
  //         css={css`
  //           display: flex;
  //           flex-direction: column;
  //           gap: 10px;
  //           height: 100%;
  //         `}
  //       >
  //         <div
  //           css={css`
  //             width: 400px;
  //             /* width: calc(20% - 10px); */
  //           `}
  //         >
  //           <Weather />
  //         </div>
  //         <div
  //           css={css`
  //             width: 350px;
  //             height: calc(250px - 10px);
  //           `}
  //         >
  //           <Ideas />
  //         </div>
  //         <div
  //           css={css`
  //             /* width: 50%; */
  //             width: 1000px;
  //             height: calc(300px - 5px);
  //             align-self: flex-end;
  //           `}
  //         >
  //           <Tasks />
  //         </div>
  //       </div>
  //       <div
  //         css={css`
  //           border: 1px solid green;
  //           height: 100px;
  //         `}
  //       >
  //         <div
  //           css={css`
  //             width: calc(55% - 10px);
  //             height: 211px;
  //           `}
  //         >
  //           <Poetry />
  //         </div>
  //         {/*

  //       <div
  //         css={css`
  //           width: 25%;
  //           height: 211px;
  //         `}
  //       >
  //         <Gallery />
  //       </div>

  //       <div
  //         css={css`
  //           width: 50%;
  //           height: 270px;
  //           align-self: flex-end;
  //         `}
  //       >
  //         <Goals />
  //       </div>
  //       <div
  //         css={css`
  //           width: 25%;
  //           height: 300px;
  //         `}
  //       >
  //         <Favourites />
  //       </div>

  //      */}
  //       </div>
  //     </main>
  //   );
  // } else {
  //   return <Mobile />;
  // }
  if (width > 800) {
    return (
      <main
        css={css`
          display: grid;
          padding: 30px;
          height: 100%;
          grid-template-columns: 1.5fr 3fr 1.4fr;
          grid-template-rows:
            calc(25% - 30px) calc(5% - 30px) calc(13% - 30px) calc(18% - 30px)
            calc(39% - 30px);
          gap: 10px;
        `}
      >
        <div
          css={css`
            grid-column: 1;
            grid-row-start: 1;
            grid-row-end: span 2;
          `}
        >
          <Weather />
        </div>
        <div
          css={css`
            grid-column: 2;
            grid-row: 1;
          `}
        >
          <Poetry />
        </div>
        <div
          css={css`
            grid-column: 3;
            grid-row-start: 1;
            grid-row-end: span 3;
          `}
        >
          <Gallery />
        </div>
        <div
          css={css`
            grid-column: 1;
            grid-row-start: 3;
            grid-row-end: 5;
          `}
        >
          <Ideas />
        </div>
        <div
          css={css`
            grid-column-start: 1;
            grid-column-end: span 2;
            grid-row: 5;
          `}
        >
          <Tasks />
        </div>
        <div
          css={css`
            grid-column: 2;
            grid-row-start: 2;
            grid-row-end: 5;
          `}
        >
          <Goals />
        </div>
        <div
          css={css`
            grid-column: 3;
            grid-row-start: 4;
            grid-row-end: 6;
          `}
        >
          <Favourites />
        </div>
      </main>
    );
  } else {
    return <Mobile />;
  }
};
