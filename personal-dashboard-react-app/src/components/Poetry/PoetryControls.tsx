/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ControlsContainerColumn, IconButton, LinkStyled } from "../shared";
import {
  HeartFillIcon,
  HeartOutlineIcon,
  BookIcon,
  RefreshIcon,
  OpenIcon,
} from "../icons";
import { ObjectId, Poem } from "@schemas/data";
import { pages } from "../../constants";
import { getItem } from "../api";
import { useEffect, useState } from "react";
import { handleHeart } from "./utils";

type SaveControl = {
  type: "save";
  poem: Poem;
};

type NavigateToPoemsControl = {
  type: "navigateToPoems";
};

type RefreshControl = {
  type: "refresh";
  onClick: () => void;
};

type ExpandControl = {
  type: "expand";
  poemId: ObjectId;
};

type Control =
  | SaveControl
  | NavigateToPoemsControl
  | RefreshControl
  | ExpandControl;

const Save = ({ poem }: { poem: Poem }) => {
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    getItem<Poem>("poems", poem._id).then((response) =>
      setIsSaved(response.success)
    );
  });

  return (
    <IconButton onClick={() => handleHeart(poem, isSaved)} fontSize="20px">
      {isSaved ? (
        <HeartFillIcon color="var(--filled-heart)" />
      ) : (
        <HeartOutlineIcon color="black" />
      )}
    </IconButton>
  );
};

const NavigateToPoems = () => (
  <IconButton>
    <LinkStyled href={pages.poetry} fontSize="20px">
      <BookIcon />
    </LinkStyled>
  </IconButton>
);

const Refresh = ({ onClick }: { onClick: () => void }) => (
  <IconButton fontSize="20px" onClick={onClick}>
    <RefreshIcon />
  </IconButton>
);

const Expand = ({ poemId }: { poemId: ObjectId }) => (
  <IconButton>
    <LinkStyled href={`/${pages.poetry}/${poemId}`} fontSize="20px">
      <OpenIcon />
    </LinkStyled>
  </IconButton>
);

export const PoetryControls = ({ controls }: { controls: Control[] }) => {
  return (
    <div
      css={css`
        width: 8%;
      `}
    >
      <ControlsContainerColumn>
        {controls.map((control) => {
          if (control.type === "save") {
            const { poem } = control;
            return <Save poem={poem} key={control.type} />;
          }
          if (control.type === "navigateToPoems") {
            return <NavigateToPoems key={control.type} />;
          }
          if (control.type === "refresh") {
            return <Refresh onClick={control.onClick} key={control.type} />;
          }
          if (control.type === "expand") {
            return <Expand poemId={control.poemId} key={control.type} />;
          }
        })}
      </ControlsContainerColumn>
    </div>
  );
};
