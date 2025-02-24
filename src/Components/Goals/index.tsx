/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import GoalsList from "./Goals List";
import GoalsInput from "./Goals Input";
import { useState } from "react";
import { initialGoals } from "./goals";
import { TbArrowUp, TbArrowDown } from "react-icons/tb";
import {
  ControlsContainer,
  Heading3,
  TopSection,
  IconButton,
  InnerBox,
  MainContainer,
  LinkStyled,
} from "../shared";
import { Goal } from "../../../schemas/data";
import { useOrderBy } from "../../hooks/useOrderBy";

function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const {
    orderBy,
    isAscending,
    onOrderByChange,
    onAscendingClick,
    onDescendingClick,
  } = useOrderBy(goals, setGoals);

  return (
    <MainContainer color="#d9c9c9">
      <TopSection>
        <Heading3>My Goals</Heading3>
        <GoalsInput goals={goals} setGoals={setGoals} />
      </TopSection>
      <InnerBox color="#e7d2d7">
        <ControlsContainer color="#e7d2d7">
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 2px;
            `}
          >
            <select name="goals-order" onChange={onOrderByChange}>
              <option>Order by</option>
              <option value="name">Name</option>
              {goals.some((goal) => goal.starred) && (
                <option value="starred">Starred</option>
              )}
              <option value="progress">Progress</option>
            </select>
            {orderBy && (
              <IconButton>
                <TbArrowUp
                  onClick={onAscendingClick}
                  css={css`
                    color: ${isAscending ? "black" : "grey"};
                  `}
                />
              </IconButton>
            )}
            {orderBy && (
              <IconButton>
                <TbArrowDown
                  onClick={onDescendingClick}
                  css={css`
                    color: ${isAscending ? "grey" : "black"};
                  `}
                />
              </IconButton>
            )}
          </div>
          <LinkStyled href="goals">See all</LinkStyled>
        </ControlsContainer>
        <GoalsList goals={goals} setGoals={setGoals} />
      </InnerBox>
    </MainContainer>
  );
}

export default Goals;
