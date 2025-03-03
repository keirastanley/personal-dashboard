/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import {
  HeartFillIcon,
  HeartOutlineIcon,
  BookIcon,
  RefreshIcon,
} from "../icons";
import { css } from "@emotion/react";
import {
  ControlsContainerColumn,
  Heading3,
  IconButton,
  LinkStyled,
  MainContainer,
} from "../shared";
import { Poem } from "@schemas/data";
import { addItem } from "../api";
import { PoemToRender } from "./PoetryPage";

function Poetry({ savedPoem }: { savedPoem?: PoemToRender }) {
  const [toggle, setToggle] = useState(false);
  const [randomPoem, setRandomPoem] = useState<Poem>();
  const [addedPoem, setAddedPoem] = useState<Poem>();

  async function getPoem() {
    const response = await fetch("https://poetrydb.org/random");
    const data = await response.json();
    setRandomPoem(data[0]);
  }

  useEffect(() => {
    getPoem();
  }, []);

  const poem = useMemo(() => savedPoem ?? randomPoem, [randomPoem]);

  function handleHeart() {
    if (
      randomPoem &&
      window.confirm(
        `Add ${randomPoem?.title} by ${randomPoem?.author} to your reading list?`
      )
    ) {
      addItem<Poem>("poems", randomPoem).then((response) => {
        if (response.success) {
          setAddedPoem(response.payload);
        }
      });
    }
  }

  useEffect(() => {
    if (addedPoem) {
      window.alert(`${addedPoem.title} has been added to your reading list.`);
    }
  }, [addedPoem]);

  return (
    <MainContainer
      color="#cfd4db"
      css={css`
        max-height: 100%;
      `}
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
        {savedPoem && savedPoem.numberOfMatches && (
          <div
            css={css`
              text-align: center;
              font-size: 12px;
              position: absolute;
              background-color: #f9dfdf;
              padding: 5px;
            `}
          >
            {`${savedPoem.numberOfMatches} ${
              savedPoem.numberOfMatches > 1 ? "matches" : "match"
            } 
            found`}
          </div>
        )}
        <div
          css={css`
            max-height: 100%;
            overflow-y: auto;
            ${savedPoem
              ? css`
                  width: calc(100% - 30px);
                `
              : css`
                  width: calc(95% - 20px);
                `}
            background-color: var(--background);
            padding: 10px;
          `}
        >
          {(savedPoem || poem) && (
            <>
              <div
                css={css`
                  ${savedPoem &&
                  savedPoem.numberOfMatches &&
                  css`
                    margin-top: 15px;
                  `}
                `}
              >
                <Heading3>
                  <i>{savedPoem ? savedPoem.title : poem?.title}</i> by{" "}
                  <i>{savedPoem ? savedPoem.author : poem?.author}</i>
                </Heading3>
                <div
                  css={css`
                    margin-top: 10px;
                  `}
                >
                  {savedPoem ? savedPoem.lines : poem?.lines}
                </div>
              </div>
            </>
          )}
        </div>
        {!savedPoem && (
          <div
            css={css`
              width: 5%;
            `}
          >
            <ControlsContainerColumn>
              <IconButton onClick={handleHeart} fontSize="20px">
                {toggle ? (
                  <HeartFillIcon color="var(--filled-heart)" />
                ) : (
                  <HeartOutlineIcon color="black" />
                )}
              </IconButton>
              <IconButton>
                <LinkStyled href="poetry" fontSize="20px">
                  <BookIcon />
                </LinkStyled>
              </IconButton>
              <IconButton fontSize="20px">
                <RefreshIcon
                  onClick={() => {
                    setToggle(false);
                    getPoem();
                  }}
                />
              </IconButton>
            </ControlsContainerColumn>
          </div>
        )}
      </div>
    </MainContainer>
  );
}

export default Poetry;
