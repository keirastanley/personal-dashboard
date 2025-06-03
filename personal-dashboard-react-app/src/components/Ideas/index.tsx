/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { RefreshIcon, DeleteIcon } from "../icons";
import IdeasInput from "./Ideas Input";
import {
  Heading3,
  IconButton,
  InnerBox,
  InputSectionColumn,
  LinkStyled,
  MainContainer,
  TopSection,
} from "../shared";
import { Idea } from "@schemas/data";
import { getItems } from "../api";
import { pages } from "../../constants";

function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [idea, setIdea] = useState<Idea>();

  const randomNumber = useMemo(
    () => Math.floor(Math.random() * ideas.length),
    [ideas]
  );

  function handleRefresh() {
    setIdea(ideas[randomNumber]);
  }

  useEffect(() => {
    getItems<Idea[]>("ideas").then((response) => {
      if (response.success) {
        setIdeas(response.payload);
      }
    });
    setIdea(ideas[randomNumber]);
  }, []);

  return (
    <MainContainer color="#dad1d4">
      <TopSection>
        <Heading3>Something to do...</Heading3>
        <LinkStyled href={pages.ideas}>See all</LinkStyled>
      </TopSection>
      <InnerBox>
        {idea && (
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            gap: 10px;
          `}
        >
          {idea ? (
            idea?.href ? (
              <LinkStyled href={idea.href} fontSize="16px">
                {idea.name}
              </LinkStyled>
            ) : (
              idea?.name
            )
          ) : (
            <i
              css={css`
                font-size: 12px;
              `}
            >
              Add some ideas to start generating random suggestions
            </i>
          )}
          {idea && (
            <IconButton>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        <InputSectionColumn>
          <IdeasInput setIdeas={setIdeas} />
        </InputSectionColumn>
      </InnerBox>
    </MainContainer>
  );
}

export default Ideas;
