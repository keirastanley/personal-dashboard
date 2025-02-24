/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Priority, Status, Task } from "../../../../schemas/data";
import { Button, InputSectionRow } from "../../shared";

export default function TaskInput({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}) {
  const [newTask, setNewTask] = useState<
    Pick<Task, "name" | "priority" | "deadline">
  >({ name: "", priority: Priority.low, deadline: "" });
  return (
    <InputSectionRow>
      <input
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        css={css`
          width: 250px;
          max-width: 300px;
          height: 17px;
        `}
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
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <Button
        onClick={() =>
          setTasks([...tasks, { ...newTask, status: Status.notStarted }])
        }
      >
        Add new
      </Button>
    </InputSectionRow>
  );
}
