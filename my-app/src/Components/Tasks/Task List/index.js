import PriorityIcon from "../Priority Icon/index";
import StatusSelect from "../Status Select/index";
import TaskDate from "./Task Date";
import { RiDeleteBinLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

export default function TaskList({ tasks, handleStatus, handleDelete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={uuidv4()}>
          <div className="priority-task">
            <PriorityIcon priority={task.priority} />
            <p className="task">{task.task}</p>
          </div>
          <div className="priority-deadline-delete">
            <StatusSelect
              status={task.status}
              handleStatus={handleStatus}
              id={task.id}
            />
            <TaskDate deadline={task.deadline}/>
            <RiDeleteBinLine className="task-delete" id={task.id} onClick={handleDelete}/>
          </div>
        </li>
      ))}
    </ul>
  );
}
