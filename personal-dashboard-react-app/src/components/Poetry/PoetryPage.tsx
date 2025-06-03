/** @jsxImportSource @emotion/react */
import { JSX, useEffect, useMemo, useState } from "react";
import { Button, ControlsContainer, Heading2, MainContainer } from "../shared";
import { ObjectId, Poem } from "@schemas/data";
import { getItems } from "../api";
import { css } from "@emotion/react";
import { SearchIcon } from "../icons";
import { getSearchResults } from "../getSearchResults";
import { HighlightedResultsText } from "../HighlightedResultsText";
import parse from "html-react-parser";
import { PoetryDisplay } from "./PoetryDisplay";
import { PoetryMainWrapper } from "./PoetryMainWrapper";
import { PoetryControls } from "./PoetryControls";

export type SearchResult = {
  searchTerm: string;
  poemId: ObjectId;
  lineIndex?: number;
  authorResult?: boolean;
  titleResult?: boolean;
  numberOfResults: number;
};

export interface PoemToRender {
  _id: ObjectId;
  title: JSX.Element | string;
  author: JSX.Element | string;
  lines: JSX.Element | string;
  numberOfMatches?: number;
}

const isPoemToRender = (poem: Poem | PoemToRender): poem is PoemToRender =>
  !!(typeof poem.lines === "string" || typeof poem.lines === "symbol");

export const PoetryPage = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>();

  useEffect(() => {
    getItems<Poem[]>("poems").then((response) => {
      if (response.success) {
        setPoems(response.payload);
      }
    });
  }, []);

  const poemsWithSearchResults: PoemToRender[] = useMemo(
    () =>
      poems
        .map((poem) => {
          const getValues = (searchTerm: string, text: string) => {
            const { textSplitBySearchTerm, numberOfMatches } = getSearchResults(
              searchTerm,
              text
            );
            return {
              numberOfMatches,
              textElement: (
                <HighlightedResultsText
                  searchTerm={searchTerm}
                  textSplitBySearchTerm={textSplitBySearchTerm}
                />
              ),
            };
          };
          if (searchTerm) {
            const titleValues = getValues(searchTerm, poem.title);
            const authorValues = getValues(searchTerm, poem.author);
            const linesValues = getValues(searchTerm, poem.lines.join("<br/>"));
            return {
              _id: poem._id,
              title: titleValues.textElement,
              author: authorValues.textElement,
              lines: linesValues.textElement,
              numberOfMatches:
                titleValues.numberOfMatches +
                authorValues.numberOfMatches +
                linesValues.numberOfMatches,
            };
          }
          return { ...poem, lines: <>{parse(poem.lines.join("<br/>"))}</> };
        })
        .sort((a, b) => {
          if (a.numberOfMatches && b.numberOfMatches) {
            return b.numberOfMatches - a.numberOfMatches;
          }
          return 1;
        }),
    [poems, searchTerm]
  );

  return (
    <MainContainer
      css={css`
        align-items: center;
        padding: 20px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          height: max-content;
          justify-content: space-around;
          padding: 10px;
          gap: 10px;
        `}
      >
        <Heading2>Reading list</Heading2>
        <div
          css={css`
            display: flex;
            background-color: white;
            gap: 5px;
            align-items: center;
            height: 30px;
            width: 50%;
            padding: 5px;
          `}
        >
          <div
            css={css`
              font-size: 16px;
            `}
          >
            <SearchIcon />
          </div>
          <input
            value={searchInputValue}
            type="text"
            css={css`
              border: none;
              height: 27px;
              width: 480px;
            `}
            onChange={(e) => setSearchInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(searchInputValue);
                setSearchInputValue("");
              }
            }}
          />
        </div>
        <ControlsContainer>
          <Button
            name="search"
            onClick={() => {
              setSearchTerm(searchInputValue);
              setSearchInputValue("");
            }}
          >
            Search
          </Button>
          <Button
            name="reset"
            onClick={() => {
              setSearchTerm(undefined);
            }}
          >
            Reset
          </Button>
        </ControlsContainer>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: max-content;
          align-items: center;
          gap: 20px;
          max-height: calc(80vh - 20px);
          overflow-y: scroll;
          padding: 20px;
        `}
      >
        {poemsWithSearchResults.map((poem) => {
          return (
            <PoetryMainWrapper
              key={poem._id.toString()}
              css={css`
                height: 200px;
              `}
            >
              <PoetryDisplay
                poem={{
                  ...poem,
                  ...(!poem.numberOfMatches && { numberOfMatches: 0 }),
                }}
              />
              <PoetryControls
                controls={[
                  { type: "expand" as const, poemId: poem._id },
                  !isPoemToRender(poem)
                    ? {
                        type: "save" as const,
                        poem,
                      }
                    : undefined,
                ].flatMap((control) => (control ? [control] : []))}
              />
            </PoetryMainWrapper>
          );
        })}
      </div>
    </MainContainer>
  );
};
