/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useState } from "react";
import { pages } from "../constants";
import { LinkStyled } from "./shared";
import { ArrowLeft } from "./icons";

export const PageNavWrapper = ({ children }: PropsWithChildren) => {
  const [showArrow, setShowArrow] = useState<string>();
  const getDisplayName = (path: string) =>
    path === "/" ? "Home" : `${path.slice(0, 1).toUpperCase()}${path.slice(1)}`;

  return (
    <div>
      <ul
        css={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 15px;
          list-style-type: none;
          padding: 20px;
          margin: 0;
          width: 200px;
        `}
      >
        {Object.values(pages).map((pagePath) => (
          <li
            key={pagePath}
            onMouseOver={() => setShowArrow(pagePath)}
            onMouseLeave={() => setShowArrow(undefined)}
          >
            <LinkStyled
              href={pagePath}
              fontSize="15px"
              css={css`
                display: flex;
                align-items: center;
                gap: 5px;
              `}
            >
              <div
                css={css`
                  display: ${showArrow === pagePath ? "flex" : "none"};
                  justify-content: center;
                `}
              >
                <ArrowLeft />
              </div>
              {getDisplayName(pagePath)}
            </LinkStyled>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};
