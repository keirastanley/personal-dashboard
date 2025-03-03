/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Heading1, Heading2 } from "../shared";
import images from "./gallery-images.json";
import parse from "html-react-parser";

export const ImagePage = () => {
  const { id } = useParams();
  const image = useMemo(
    () =>
      images
        .map((image) => ({
          ...image,
          id: image.name.toLowerCase().replace(",", "").split(" ").join("-"),
        }))
        .find((img) => img.id === id),
    [id]
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 40px;
      `}
    >
      <Heading1>
        {image?.name}, {image?.year} by {image?.artist}
      </Heading1>
      {image?.nameOrgLang && (
        <Heading2>
          <i>
            {image.nameOrgLang.lang}: {image.nameOrgLang.name}
          </i>
        </Heading2>
      )}
      <div
        css={css`
          /* display: flex;
          align-items: flex-start;
          align-items: center; */
        `}
      >
        <img
          src={image?.src}
          alt={image?.alt}
          css={css`
            float: left;
            margin: 10px;
            height: 30vw;
            white-space: pre-wrap;
          `}
        />
        {image?.info && <p>{parse(image.info.text)}</p>}
        {image?.info && image?.info.infoFrom && (
          <i>
            From {image.info.infoFrom} <br />
          </i>
        )}
        {image?.info && image?.info.onView && (
          <i>On view at {image.info.onView}</i>
        )}
      </div>
    </div>
  );
};
