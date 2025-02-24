/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import images from "./gallery-images";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { IconButton } from "../shared";
import { GalleryCaption } from "./GalleryWidget";
import { IoOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function GalleryPage() {
  const navigate = useNavigate();
  function handleExpand() {
    // const randomNumber = Math.floor(Math.random() * images.length)
  }

  return (
    <div
      css={css`
        width: calc(100% - 20px);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        padding: 10px;
        gap: 10px;
      `}
    >
      {images.length > 0
        ? images.map((image) => (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: calc(100% / 3 - 30px);
                padding: 10px;
                background-color: var(--header);
              `}
            >
              <img
                src={image.src}
                alt={image.alt}
                css={css`
                  height: 200px;
                `}
              />
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  padding: 10px;
                `}
              >
                <GalleryCaption image={image} />
                <IconButton onClick={() => navigate(`/gallery/${image.id}`)}>
                  <IoOpenOutline />
                </IconButton>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
