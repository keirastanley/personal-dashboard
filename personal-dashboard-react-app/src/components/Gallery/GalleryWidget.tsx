/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import {
  HeartOutlineIcon,
  HeartFillIcon,
  RefreshIcon,
  GalleryIcon,
} from "../icons";
import {
  ControlsContainer,
  IconButton,
  LinkStyled,
  MainContainer,
} from "../shared";
import images from "./gallery-images.json";
import { GalleryImage } from "@schemas/data";
import { pages } from "../../constants";

export const GalleryCaption = ({ image }: { image: GalleryImage }) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      font-size: 14px;
    `}
  >
    <i>
      {image.name}, {image.artist}, {image.medium}, {image.year}
    </i>
  </div>
);

function Gallery({ imageHeight }: { imageHeight?: string }) {
  const [heartIsFilled, setHeartIsFilled] = useState<boolean>(false);
  const [image, setImage] = useState(images[0]);

  const getRandomNumber = () => Math.floor(Math.random() * images.length);

  function handleRefresh() {
    const randomNumber = getRandomNumber();
    setImage(images[randomNumber]);
  }

  useEffect(() => {
    const randomNumber = getRandomNumber();
    setImage(images[randomNumber]);
  }, []);

  return (
    <MainContainer color="var(--header)">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        `}
      >
        <img
          src={image.src}
          alt={image.alt}
          css={css`
            margin-top: 10px;
            height: ${imageHeight ?? "25vh"};
            width: auto;
          `}
        />
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 5px;
            height: 100%;
            margin: 0px 10px 0px 10px;
          `}
        >
          <GalleryCaption image={image} />
          <ControlsContainer>
            <IconButton onClick={() => setHeartIsFilled(!heartIsFilled)}>
              {heartIsFilled ? (
                <HeartFillIcon color="var(--filled-heart)" />
              ) : (
                <HeartOutlineIcon color="black" />
              )}
            </IconButton>
            <IconButton>
              <LinkStyled href={pages.gallery}>
                <GalleryIcon color="black" />
              </LinkStyled>
            </IconButton>
            <IconButton onClick={handleRefresh}>
              <RefreshIcon color="black" />
            </IconButton>
          </ControlsContainer>
        </div>
      </div>
    </MainContainer>
  );
}

export default Gallery;
