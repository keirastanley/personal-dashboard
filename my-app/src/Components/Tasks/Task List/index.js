import PriorityIcon from "../Priority Icon/index";
import StatusSelect from "../Status Select/index";
import TaskDate from "./Task Date";
import { v4 as uuidv4 } from 'uuid';

export default function TaskList({ tasks, handleStatus }) {
  console.log(tasks)
  return (
    <ul>
      {tasks.map((task) => (
        <li key={uuidv4()}>
          <div className="priority-task">
            <PriorityIcon priority={task.priority} />
            <p className="task">{task.task}</p>
          </div>
          <div className="priority-deadline">
            <StatusSelect
              status={task.status}
              handleStatus={handleStatus}
              id={task.id}
            />
            <TaskDate deadline={task.deadline}/>
          </div>
        </li>
      ))}
    </ul>
  );
}
