/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import IdeasInput from "./Ideas Input";
import {
  Heading3,
  IconButton,
  InnerBox,
  LinkStyled,
  MainContainer,
  TopSection,
} from "../shared";
import { Idea } from "../../interfaces";

const initialIdeas: Idea[] = [
  { name: "Play a game of chess", href: "www.lichess.com" },
  { name: "Practise on Codewars", href: "www.codewars.com" },
  { name: "Read a book", href: undefined },
  { name: "Clean the kitchen", href: undefined },
  { name: "Make a dessert", href: undefined },
  { name: "Paint nails", href: undefined },
  { name: "Play the piano", href: undefined },
  { name: "Tidy your room", href: undefined },
  { name: "Do laundry", href: undefined },
  {
    name: "Yoga or stretching",
    href: "https://www.youtube.com/c/yogawithadriene",
  },
];

function Ideas() {
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [idea, setIdea] = useState<Idea>();

  const getRandomNumber = () => Math.floor(Math.random() * ideas.length);

  function handleRefresh() {
    const randomNumber = getRandomNumber();
    setIdea(ideas[randomNumber]);
  }

  useEffect(() => {
    const randomNumber = getRandomNumber();
    setIdea(ideas[randomNumber]);
  }, []);

  return (
    <MainContainer color="#dad1d4">
      <TopSection>
        <Heading3>Something to do...</Heading3>
        <LinkStyled href="www.temporarylink.com">See all</LinkStyled>
      </TopSection>
      <InnerBox>
        <IconButton onClick={handleRefresh}>
          <TbRefresh />
        </IconButton>
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
          {idea?.href ? (
            <LinkStyled href={idea.href} fontSize="16px">
              {idea.name}
            </LinkStyled>
          ) : (
            idea?.name
          )}
          <IconButton>
            <RiDeleteBinLine />
          </IconButton>
        </div>
        <IdeasInput ideas={ideas} setIdeas={setIdeas} />
      </InnerBox>
    </MainContainer>
  );
}

export default Ideas;
