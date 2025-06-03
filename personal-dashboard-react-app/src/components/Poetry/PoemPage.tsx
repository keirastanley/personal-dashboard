/** @jsxImportSource @emotion/react */
import { useParams } from "react-router";
import { Button, Heading1, Heading2, LinkStyled } from "../shared";
import { useEffect, useState } from "react";
import { Poem, ObjectId } from "@schemas/data";
import { getItem } from "../api";
import { css } from "@emotion/react";
import parse from "html-react-parser";
import { pages } from "../../constants";

export const PoemPage = () => {
  const { id } = useParams();
  const [poem, setPoem] = useState<Poem>();
  useEffect(() => {
    if (id) {
      getItem<Poem>("poems", id as unknown as ObjectId).then((response) => {
        if (response.success) {
          setPoem(response.payload);
        }
      });
    }
  }, []);

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        css={css`
          margin: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}
      >
        <Button>
          <LinkStyled href={`/${pages.poetry}`}>Back</LinkStyled>
        </Button>
        <div
          css={css`
            background-color: white;
            width: max-content;
            padding: 40px;
            max-height: calc(100vh - 160px);
            overflow: hidden;
          `}
        >
          {poem ? (
            <>
              <Heading1>{poem.title}</Heading1>
              <Heading2 css={css``}>By {poem.author}</Heading2>
              <div
                css={css`
                  max-height: calc(100vh - 200px);
                  overflow-y: hidden;
                  overflow-x: hidden;
                `}
              >
                <p
                  css={css`
                    font-family: "Goudy Bookletter 1911", serif;
                    font-size: 20px;
                    max-height: calc(100vh - 225px);
                    overflow-y: auto;
                    width: max-content;
                  `}
                >
                  {parse(poem.lines.join("<br />"))}
                </p>
              </div>
            </>
          ) : (
            "Poem not found"
          )}
        </div>
      </div>
    </div>
  );
};
