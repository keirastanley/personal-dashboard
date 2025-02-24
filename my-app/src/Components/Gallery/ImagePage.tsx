/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Heading1, Heading2 } from "../shared";
import images from "./gallery-images";
import parse from "html-react-parser";

export const ImagePage = () => {
  const { id } = useParams();
  const image = useMemo(() => images.find((img) => img.id === id), [id]);

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
        {image?.title}, {image?.year} by {image?.artist}
      </Heading1>
      {image?.titleOrgLang && (
        <Heading2>
          <i>
            {image.titleOrgLang.lang}: {image.titleOrgLang.title}
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
