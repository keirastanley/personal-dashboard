/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TaskInput from "./Task Input/index";
import TaskList from "./Task List";
import { useEffect, useState } from "react";
import {
  ControlsContainer,
  Heading3,
  TopSection,
  InnerBox,
  MainContainer,
  IconButton,
  LinkStyled,
} from "../shared";
import { Task } from "@schemas/data";
import { useOrderBy } from "../../hooks/useOrderBy";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";
import { getItems } from "../api";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    orderBy,
    isAscending,
    onOrderByChange,
    onAscendingClick,
    onDescendingClick,
  } = useOrderBy(tasks, setTasks);

  useEffect(() => {
    getItems<Task[]>("tasks").then((response) => {
      if (response.success) {
        setTasks(response.payload);
      }
    });
  }, []);

  return (
    <MainContainer color="#c7c7c7;">
      <TopSection>
        <Heading3>Things to do</Heading3>
        <TaskInput setTasks={setTasks} />
      </TopSection>
      <InnerBox color="white">
        <ControlsContainer>
          <select name="tasks-order" onChange={onOrderByChange}>
            <option>Order by</option>
            <option value="name">Name</option>
            <option value="priority">Priority</option>
            <option value="deadline">Deadline</option>
            <option value="status">Status</option>
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
          <LinkStyled href="tasks">See all</LinkStyled>
        </ControlsContainer>
        <TaskList tasks={tasks} setTasks={setTasks} />
      </InnerBox>
    </MainContainer>
  );
}

export default Tasks;
