/** @jsxImportSource @emotion/react */
import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { Goal } from "../../../../schemas/data";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ComponentProps, HTMLAttributes } from "react";
import {
  IconButton,
  LinkStyled,
  ListItem,
  ListItemLeft,
  ListItemRight,
  ListItemsContainer,
  StarIcon,
} from "../../shared";

const ProgressBar = styled.div`
  width: 70%;
  background-color: #b0b0b0;
`;

const progressColors = {
  0: "#f97575",
  10: "#f98b75",
  20: "#f9a375",
  30: "#f9ae75",
  40: "#f9cd75",
  50: "#f9e975",
  60: "#e1f975",
  70: "#d6f975",
  80: "#98f975",
  90: "#82f975",
  100: "#75f979",
};

const getProgressColor = (progress: Goal["progress"]) => {
  let color = progressColors[0];
  Object.keys(progressColors).map((key) => {
    const progressColorKey = Number(key) as keyof typeof progressColors;
    if (progress >= progressColorKey) {
      color = progressColors[progressColorKey];
    }
  });
  return color;
};

type ProgressProps = HTMLAttributes<HTMLDivElement> & { progress: number };

const Progress = styled.div`
  height: 100%;
  width: ${({ progress }: ProgressProps) => progress}%;
  background-color: ${({ progress }: ProgressProps) =>
    getProgressColor(progress)};
`;

function GoalsList({
  goals,
  setGoals,
}: {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}) {
  return (
    <ListItemsContainer>
      {goals.map((goal, i) => (
        <ListItem key={goal.name + i}>
          <ListItemLeft width="50%">
            <IconButton
              onClick={() => {
                setGoals([
                  ...goals.slice(0, i),
                  { ...goal, starred: true },
                  ...goals.slice(i + 1),
                ]);
              }}
            >
              <StarIcon starred={goal.starred} />
            </IconButton>
            {goal.href ? (
              <LinkStyled href={goal.href} fontSize="16px">
                {goal.name}
              </LinkStyled>
            ) : (
              goal.name
            )}
          </ListItemLeft>
          <ListItemRight width="80%">
            <ProgressBar>
              <Progress progress={goal.progress} />
            </ProgressBar>
            <IconButton
              onClick={() => {
                setGoals([
                  ...goals.slice(0, i),
                  {
                    ...goal,
                    progress: goal.progress + 5 < 100 ? goal.progress + 5 : 100,
                  },
                  ...goals.slice(i + 1),
                ]);
              }}
            >
              <AiOutlinePlusSquare />
            </IconButton>
            <IconButton
              onClick={() => {
                setGoals([
                  ...goals.slice(0, i),
                  {
                    ...goal,
                    progress: goal.progress - 5 > 0 ? goal.progress - 5 : 0,
                  },
                  ...goals.slice(i + 1),
                ]);
              }}
            >
              <AiOutlineMinusSquare />
            </IconButton>
            <IconButton
              onClick={() => {
                if (window.confirm(`Do you want to delete '${goal.name}'?`)) {
                  setGoals([...goals.slice(0, i), ...goals.slice(i + 1)]);
                }
              }}
            >
              <RiDeleteBinLine />
            </IconButton>
          </ListItemRight>
        </ListItem>
      ))}
    </ListItemsContainer>
  );
}

export default GoalsList;
