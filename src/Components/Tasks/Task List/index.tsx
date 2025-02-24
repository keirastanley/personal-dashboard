/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PriorityIcon from "../Priority Icon/index";
import { RiDeleteBinLine } from "react-icons/ri";
import { Priority, Status, Task } from "../../../interfaces";
import {
  IconButton,
  ListItem,
  ListItemLeft,
  ListItemRight,
  ListItemsContainer,
} from "../../shared";

export default function TaskList({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}) {
  const changePriority = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return Priority.low;
      case "Medium":
        return Priority.high;
      case "Low":
      default:
        return Priority.medium;
    }
  };

  return (
    <ListItemsContainer>
      {tasks.map((task, i) => (
        <ListItem key={task.name + i}>
          <ListItemLeft width="50%">
            <IconButton
              onClick={() =>
                setTasks([
                  ...tasks.slice(0, i),
                  {
                    ...task,
                    priority: changePriority(task.priority),
                  },
                  ...tasks.slice(i + 1),
                ])
              }
            >
              <PriorityIcon priority={task.priority} />
            </IconButton>
            <span
              css={css`
                ${task.status === Status.completed &&
                css`
                  text-decoration: line-through;
                `};
              `}
            >
              {task.name}
            </span>
          </ListItemLeft>
          <ListItemRight width="50%">
            <select
              css={css`
                background: white;
                border: 1px solid #969696;
                ${task.status === Status.notStarted &&
                css`
                  background-color: #fcc7c4;
                  border: none;
                `}
                ${task.status === Status.inProgress &&
                css`
                  background-color: #f7eecf;
                  border: none;
                `}
                  ${task.status === Status.completed &&
                css`
                  background-color: #d0e6c0;
                  border: none;
                `}
              `}
              onChange={(e) =>
                setTasks([
                  ...tasks.slice(0, i),
                  {
                    ...task,
                    status: e.target.value as Task["status"],
                  },
                  ...tasks.slice(i + 1),
                ])
              }
              value={task.status}
            >
              <option value={Status.notStarted}>Not started</option>
              <option value={Status.inProgress}>In progress</option>
              <option value={Status.completed}>Completed</option>
            </select>
            <span>
              {task.deadline
                .split("-")
                .reverse()
                .toString()
                .replaceAll(",", "/")}
            </span>
            <RiDeleteBinLine
              css={css`
                font-size: 18px;
                align-self: center;
              `}
              // onClick={handleDelete}
            />
          </ListItemRight>
        </ListItem>
      ))}
    </ListItemsContainer>
  );
}
