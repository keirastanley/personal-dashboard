/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "./index.css";
import { Link } from "react-router-dom";
// import initialGoals from "./goals";
import GoalsList from "./Goals List";
import GoalsInput from "./Goals Input";
import { useState, useReducer, useEffect } from "react";
import { addItem, deleteItem, editItem, getItems } from "../../Functions";
import { initialGoals } from "./goals";

import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { TbRefresh, TbArrowUp, TbArrowDown } from "react-icons/tb";
import styled from "@emotion/styled";
import {
  ControlsContainer,
  Heading3,
  TopSection,
  IconButton,
  InnerBox,
  MainContainer,
  LinkStyled,
} from "../shared";
import { Goal } from "../../interfaces";
import { useOrderBy } from "../../hooks/useOrderBy";

function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  // const [orderBy, setOrderBy] = useState<string>();
  // const [ascending, setAscending] = useState<boolean>(true);

  // function orderArray(orderBy: string, isAscending = true) {
  //   const getNewGoals = (): Goal[] => {
  //     switch (orderBy) {
  //       case "progress":
  //         return [
  //           ...goals.sort((a, b) =>
  //             isAscending ? b.progress - a.progress : a.progress - b.progress
  //           ),
  //         ];
  //       case "starred":
  //         return isAscending
  //           ? [
  //               ...goals.filter((goal) => goal.starred === true),
  //               ...goals.filter((goal) => goal.starred === false),
  //             ]
  //           : [
  //               ...goals.filter((goal) => goal.starred === false),
  //               ...goals.filter((goal) => goal.starred === true),
  //             ];
  //       case "name":
  //       default:
  //         return [
  //           ...goals.sort((a, b) =>
  //             isAscending
  //               ? a.name > b.name
  //                 ? 1
  //                 : b.name > a.name
  //                 ? -1
  //                 : 0
  //               : b.name > a.name
  //               ? 1
  //               : a.name > b.name
  //               ? -1
  //               : 0
  //           ),
  //         ];
  //     }
  //   };
  //   const newGoals = getNewGoals();
  //   setGoals(newGoals);
  // }

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
            {/* <IconButton
              onClick={() => {
                if (orderBy) {
                  orderArray(orderBy);
                }
              }}
            >
              <TbRefresh />
            </IconButton> */}
          </div>
          <LinkStyled href="goals">See all</LinkStyled>
        </ControlsContainer>
        <GoalsList
          goals={goals}
          setGoals={setGoals}
          // handleProgress={handleProgress}
          // setStars={setStars}
          // className={className}
        />
      </InnerBox>
    </MainContainer>
  );
}

export default Goals;
