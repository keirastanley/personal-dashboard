/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PriorityIcon from "../Priority Icon/index";
import { DeleteIcon } from "../../icons";
import { Priority, Status, Task } from "@schemas/data";
import {
  EditableTextInput,
  IconButton,
  ListItem,
  ListItemLeft,
  ListItemRight,
  ListItemsContainer,
} from "../../shared";
import { Dispatch, SetStateAction } from "react";
import { deleteItem, editItem } from "../../api";

export default function TaskList({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) {
  const changePriority = (priority: Task["priority"]) => {
    switch (priority) {
      case Priority.high:
        return Priority.low;
      case Priority.medium:
        return Priority.high;
      case Priority.low:
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
              onClick={() => {
                editItem<Task>("tasks", task._id, {
                  priority: changePriority(task.priority),
                }).then((response) => {
                  if (response.success) {
                    setTasks((prevTasks) => [
                      ...prevTasks.slice(0, i),
                      response.payload,
                      ...prevTasks.slice(i + 1),
                    ]);
                  }
                });
              }}
            >
              <PriorityIcon priority={task.priority} />
            </IconButton>
            <EditableTextInput
              crossThroughText={task.status === Status.completed}
              textValue={task.name}
              onBlur={(updatedName?: string) => {
                if (updatedName) {
                  editItem<Task>("tasks", task._id, {
                    name: updatedName,
                  }).then((response) => {
                    if (response.success) {
                      setTasks((prevTasks) => [
                        ...prevTasks.slice(0, i),
                        response.payload,
                        ...prevTasks.slice(i + 1),
                      ]);
                    }
                  });
                }
              }}
            />
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
              onChange={
                (e) => {
                  editItem<Task>("tasks", task._id, {
                    status: e.target.value as Status,
                  }).then((response) => {
                    if (response.success) {
                      setTasks((prevTasks) => [
                        ...prevTasks.slice(0, i),
                        response.payload,
                        ...prevTasks.slice(i + 1),
                      ]);
                    }
                  });
                }
                // setTasks([
                //   ...tasks.slice(0, i),
                //   {
                //     ...task,
                //     status: e.target.value as Task["status"],
                //   },
                //   ...tasks.slice(i + 1),
                // ])
              }
              value={task.status}
            >
              <option value={Status.notStarted}>Not started</option>
              <option value={Status.inProgress}>In progress</option>
              <option value={Status.completed}>Completed</option>
            </select>
            <input
              type="date"
              value={task.deadline}
              onChange={(e) => {
                editItem<Task>("tasks", task._id, {
                  deadline: e.target.value,
                }).then((response) => {
                  if (response.success) {
                    setTasks((prevTasks) => [
                      ...prevTasks.slice(0, i),
                      response.payload,
                      ...prevTasks.slice(i + 1),
                    ]);
                  }
                });
              }}
            />
            <IconButton>
              <DeleteIcon
                css={css`
                  font-size: 18px;
                  align-self: center;
                `}
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete ${task.name}?`
                    )
                  ) {
                    deleteItem("tasks", task._id).then((response) => {
                      if (response.success) {
                        setTasks((prevTasks) =>
                          prevTasks.filter(({ _id }) => _id !== task._id)
                        );
                      }
                    });
                  }
                }}
              />
            </IconButton>
          </ListItemRight>
        </ListItem>
      ))}
    </ListItemsContainer>
  );
}
