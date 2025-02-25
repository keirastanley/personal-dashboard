/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TaskInput from "./Task Input/index";
import TaskList from "./Task List";
import { useState } from "react";
import {
  ControlsContainer,
  Heading3,
  TopSection,
  InnerBox,
  MainContainer,
  IconButton,
} from "../shared";
import { Priority, Status, Task } from "@schemas/data";
import { useOrderBy } from "../../hooks/useOrderBy";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";

const initialTasks: Task[] = [
  {
    name: "Do the laundry",
    priority: Priority.low,
    status: Status.notStarted,
    deadline: "2022-12-22",
  },
  {
    name: "Finish yesterday's workshop",
    priority: Priority.medium,
    status: Status.notStarted,
    deadline: "2022-12-25",
  },
  {
    name: "Go to the supermarket",
    priority: Priority.medium,
    status: Status.notStarted,
    deadline: "2022-11-26",
  },
  {
    name: "Write final essay",
    priority: Priority.high,
    status: Status.notStarted,
    deadline: "2022-12-26",
  },
  {
    name: "Make birthday cake for Susan",
    priority: Priority.medium,
    status: Status.notStarted,
    deadline: "2022-12-23",
  },
  {
    name: "Make birthday cake for Susan",
    priority: Priority.medium,
    status: Status.notStarted,
    deadline: "2022-12-23",
  },
  {
    name: "Make birthday cake for Susan",
    priority: Priority.medium,
    status: Status.notStarted,
    deadline: "2022-12-23",
  },
  {
    name: "Make birthday cake for Susan",
    priority: Priority.low,
    status: Status.notStarted,
    deadline: "2022-12-23",
  },
  {
    name: "Make birthday cake for Susan",
    priority: Priority.medium,
    status: Status.notStarted,
    deadline: "2022-12-23",
  },
  {
    name: "Make birthday cake for Susan",
    priority: Priority.medium,
    status: Status.notStarted,
    deadline: "2022-12-23",
  },
];

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const {
    orderBy,
    isAscending,
    onOrderByChange,
    onAscendingClick,
    onDescendingClick,
  } = useOrderBy(tasks, setTasks);

  return (
    <MainContainer color="#c7c7c7;">
      <TopSection>
        <Heading3>Things to do</Heading3>
        <TaskInput tasks={tasks} setTasks={setTasks} />
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
          <a
            href="tasks"
            css={css`
              color: black;
              font-size: 12px;
            `}
          >
            See all
          </a>
        </ControlsContainer>
        <TaskList tasks={tasks} setTasks={setTasks} />
      </InnerBox>
    </MainContainer>
  );
}

export default Tasks;
