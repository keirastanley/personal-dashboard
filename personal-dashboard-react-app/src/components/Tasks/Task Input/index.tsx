/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction, useState } from "react";
import { Priority, Status, Task } from "@schemas/data";
import { Button, Input, InputSectionRow } from "../../shared";
import { addItem } from "../../api";

export default function TaskInput({
  setTasks,
}: {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) {
  const [newTask, setNewTask] = useState<
    Pick<Task, "name" | "priority" | "deadline">
  >({ name: "", priority: Priority.low, deadline: "" });
  return (
    <InputSectionRow>
      <Input
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        type="text"
        name="task"
        placeholder="Enter a task..."
      />
      <input
        type="date"
        name="task-date"
        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
      />
      <select
        name="task-priority"
        onChange={(e) =>
          setNewTask({
            ...newTask,
            priority: e.target.value as Task["priority"],
          })
        }
      >
        <option>Priority</option>
        <option value={Priority.low}>Low</option>
        <option value={Priority.medium}>Medium</option>
        <option value={Priority.high}>High</option>
      </select>
      <Button
        onClick={() => {
          addItem<Task>("tasks", {
            ...newTask,
            status: Status.notStarted,
          }).then((response) => {
            if (response.success) {
              setTasks((prevTasks) => [...prevTasks, response.payload]);
            }
          });
          setNewTask({ name: "", priority: Priority.low, deadline: "" });
        }}
      >
        Add new
      </Button>
    </InputSectionRow>
  );
}
