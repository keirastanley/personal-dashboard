/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import images from "./gallery-images.json";
import { IconButton } from "../shared";
import { GalleryCaption } from "./GalleryWidget";
import { OpenIcon } from "../icons";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { GalleryImage } from "@schemas/data";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<
    (GalleryImage & { id: string })[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    setGalleryImages(
      images.map((image) => ({
        ...image,
        id: image.name.toLowerCase().replace(",", "").split(" ").join("-"),
      }))
    );
  }, []);

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
      {galleryImages.length > 0
        ? galleryImages.map((image) => (
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
                  <OpenIcon />
                </IconButton>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
