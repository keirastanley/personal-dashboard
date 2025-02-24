/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoBook } from "react-icons/go";
import { TbRefresh } from "react-icons/tb";
import { css } from "@emotion/react";
import {
  ControlsContainerColumn,
  Heading3,
  IconButton,
  LinkStyled,
  MainContainer,
} from "../shared";

interface Poem {
  title: string;
  author: string;
  lines: string[];
}

function Poetry() {
  const [toggle, setToggle] = useState(false);
  const [added, setAdded] = useState(false);
  const [poem, setPoem] = useState<Poem>();

  async function getPoem() {
    const response = await fetch("https://poetrydb.org/random");
    const data = await response.json();
    setPoem(data[0]);
  }

  useEffect(() => {
    getPoem();
  }, []);

  // async function addNewPoem(poem: Poem) {
  //   const data = await addItem("poems", poem);
  // }

  function handleHeart() {
    if (
      poem &&
      window.confirm(
        `Add ${poem?.title} by ${poem?.author} to your reading list?`
      )
    ) {
      setToggle(true);
      // addNewPoem(poem);
      setAdded(true);
    }
    if (added) {
      alert(
        `${poem?.title} by ${poem?.author} is already in your reading list.`
      );
    }
  }

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
        <div
          css={css`
            max-height: 100%;
            overflow-y: auto;
            width: calc(95% - 20px);
            background-color: var(--background);
            padding: 10px;
          `}
        >
          {poem && (
            <>
              <Heading3>
                <i>{poem.title}</i> by <i>{poem.author}</i>
              </Heading3>
              <ul
                css={css`
                  list-style: none;
                  margin: 0;
                  margin-top: 20px;
                  padding: 0;
                `}
              >
                {poem.lines.map((line, i) => (
                  <li key={line + i}>{line}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div
          css={css`
            width: 5%;
          `}
        >
          <ControlsContainerColumn>
            <IconButton onClick={handleHeart} fontSize="20px">
              {toggle ? (
                <AiFillHeart color="var(--filled-heart)" />
              ) : (
                <AiOutlineHeart color="black" />
              )}
            </IconButton>
            <IconButton>
              <LinkStyled href="poetry" fontSize="20px">
                <GoBook />
              </LinkStyled>
            </IconButton>
            <IconButton fontSize="20px">
              <TbRefresh
                onClick={() => {
                  setToggle(false);
                  getPoem();
                }}
              />
            </IconButton>
          </ControlsContainerColumn>
        </div>
      </div>
    </MainContainer>
  );
}

export default Poetry;
