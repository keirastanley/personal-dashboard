/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MainContainer } from "../shared";
import { HTMLAttributes } from "react";

export const PoetryMainWrapper = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <MainContainer
    color="#cfd4db"
    css={css`
      height: 100%;
      max-height: 100%;
      /* min-height: 100%; */
    `}
    {...props}
  >
    <div
      css={css`
        display: flex;
        max-height: calc(100% - 20px);
        width: calc(100% - 10px);
        margin: 10px;
        overflow-x: hidden;
        overflow-y: hidden;
      `}
    >
      {children}
    </div>
  </MainContainer>
);
