/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import parse from "html-react-parser";
import { Heading3 } from "../shared";
import { Poem } from "@schemas/data";
import { PoemToRender } from "./PoetryPage";

export const PoetryDisplay = ({ poem }: { poem: Poem | PoemToRender }) => {
  console.log({ poem });
  const isPoemToRender = (poem: Poem | PoemToRender): poem is PoemToRender => {
    if ("numberOfMatches" in poem) {
      return true;
    }
    return false;
  };

  const showNumberOfMatches = (
    numberOfMatches?: number
  ): numberOfMatches is number => !!(numberOfMatches && numberOfMatches > 0);

  return (
    <>
      {isPoemToRender(poem) && showNumberOfMatches(poem.numberOfMatches) && (
        <div
          css={css`
            text-align: center;
            font-size: 12px;
            position: absolute;
            background-color: #f9dfdf;
            padding: 5px;
          `}
        >
          {`${poem.numberOfMatches} ${
            poem.numberOfMatches > 1 ? "matches" : "match"
          } 
    found`}
        </div>
      )}
      <div
        css={css`
          width: 100%;
          max-height: 100%;
          overflow-y: auto;
          ${isPoemToRender(poem)
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
        {poem && (
          <>
            <div
              css={css`
                ${isPoemToRender(poem) &&
                showNumberOfMatches(poem.numberOfMatches) &&
                css`
                  margin-top: 15px;
                `}
              `}
            >
              <Heading3>
                <i>{poem.title}</i> by <i>{poem.author}</i>
              </Heading3>
              <div
                css={css`
                  margin-top: 10px;
                  font-family: "Goudy Bookletter 1911", serif;
                `}
              >
                {isPoemToRender(poem)
                  ? poem.lines
                  : parse(poem.lines.join("<br />"))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
