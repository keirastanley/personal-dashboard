import "./index.css";
import TaskInput from "./Task Input/index";
import TaskList from "./Task List";
import TaskOrderSelect from "./Task Order Select";
import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    task: "Do the laundry",
    priority: "Low",
    status: "not-started",
    deadline: "2022-12-22",
  },
  {
    id: 2,
    task: "Finish yesterday's workshop",
    priority: "Medium",
    status: "not-started",
    deadline: "2022-12-25",
  },
  {
    id: 3,
    task: "Go to the supermarket",
    priority: "Low",
    status: "not-started",
    deadline: "2022-11-26",
  },
  {
    id: 4,
    task: "Write final essay",
    priority: "High",
    status: "not-started",
    deadline: "2022-12-26",
  },
  {
    id: 5,
    task: "Make birthday cake for Susan",
    priority: "Medium",
    status: "not-started",
    deadline: "2022-12-23",
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [count, setCount] = useState(tasks.length + 1);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");

  function handleChange(event) {
    console.log(event.target.name);
    switch (event.target.name) {
      case "task":
        setText(event.target.value);
        break;
      case "task-date":
        setDate(event.target.value);
        break;
      case "task-priority":
        setPriority(event.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit() {
    setCount(count + 1);
    const newObj = {
      id: count,
      task: text,
      priority: priority,
      status: "not-started",
      deadline: date,
    };
    const newArr = [...tasks, newObj];
    setTasks(newArr);
  }

  function handleDelete(event){
    let compare = 0;
    if (event.target.id.length < 1){
      compare = Number(event.target.ownerSVGElement.id);
    }
    else {
      compare = Number(event.target.id);
    }
    tasks.map(task => {
      if (task.id === compare){
        if (window.confirm(`Are you sure you want to delete '${task.task}'?`)){
          const newTasks = tasks.filter(task => task.id !== compare);
          setTasks(newTasks);
        }
      }
      return tasks;
    })
  }

  function handleStatus(event) {
    tasks.map(function (task, ind, arr) {
      if (task.id === Number(event.target.id)) {
        const newObj = {
          id: task.id,
          task: task.task,
          priority: task.priority,
          status: event.target.value,
          deadline: task.deadline,
        };
        const newArr = [...arr.slice(0, ind), newObj, ...arr.slice(ind + 1)];
        setTasks(newArr);
      }
      return task;
    });
  }

  function orderArray(event) {
    if (event.target.value === "name") {
      const newArr = [
        ...tasks.sort((a, b) =>
          a.task > b.task ? 1 : b.task > a.task ? -1 : 0
        ),
      ];
      setTasks(newArr)
    }
    if (event.target.value === "priority") {
      const newArr = [
        ...tasks.filter(task => task.priority === "High"),
        ...tasks.filter(task => task.priority === "Medium"),
        ...tasks.filter(task => task.priority === "Low")
      ];
      setTasks(newArr)
    }
    if (event.target.value === "status") {
        const newArr = [
          ...tasks.filter(task => task.status === "not-started"),
          ...tasks.filter(task => task.status === "in-progress"),
          ...tasks.filter(task => task.status === "completed")
        ];
        setTasks(newArr)
      }
    if (event.target.value === "deadline") {
        const newArr = [...tasks.sort((a, b) => Number(a.deadline.replaceAll("-", "")) - Number(b.deadline.replaceAll("-", "")))]
        setTasks(newArr)
    }
  }

  return (
    <div className="tasks-container">
      <div className="tasks-top-level">
        <h3>Things to do</h3>
        <TaskInput handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      <div className="tasks-section">
        <div className="tasks-top-level">
          <TaskOrderSelect orderArray={orderArray}/>
          <a href="www.temp.com">See all</a>
        </div>
        <div className="tasks">
          <TaskList tasks={tasks} handleStatus={handleStatus} handleDelete={handleDelete}/>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
