import "./index.css";
import { useReducer } from "react";
import GoalsInput from "./Goals Input";
import GoalsOrderSelect from "./Goals Order Select";
import GoalsContent from "./Goals Content";

const initialGoals = [
  { goal: "Learn Algebra", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 1 },
  { goal: "Create a personal portfolio", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 2 },
  { goal: "Reach 4kyu on Codewars", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 3 },
  { goal: "Learn to play tennis", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 4 },
  { goal: "Exercise everyday", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 5 },
];

function Goals() {

  const [goals, dispatch] = useReducer(setGoals, initialGoals);

  function setGoals(state, action){
    switch (action.type){
      case "SET_STARS":
        return action.payload
      case "ORDER_BY_NAME":
        return action.payload
      case "ORDER_BY_STAR":
        return action.payload
      case "ORDER_BY_PROGRESS":
        return action.payload
      default:
        return state;
    }
  }

  function setStars(event){
    const newGoals = goals.map((goal) => {
      if (Number(event.target.parentElement.id) === goal.id){
          goal.starred = !goal.starred;
          if (goal.starred === true){
            goal.className = "star-icon-selected"
          }
          else {
            goal.className = "star-icon"
          }
      }
      return goal;
    })
    dispatch({
      type: "SET_STARS",
      payload: newGoals,
    })
  }

  function orderArray(event){
    if (event.target.value === "name"){
      const newGoals = [...goals.sort((a,b) => (a.goal > b.goal) ? 1 : ((b.goal > a.goal) ? -1 : 0))]
      dispatch({
        type: "ORDER_BY_NAME",
        payload: newGoals,
      })
    }
    if (event.target.value === "starred"){
      const newGoals = [...goals.filter(goal => goal.starred === true), ...goals.filter(goal => goal.starred === false)]
      dispatch({
        type: "ORDER_BY_STAR",
        payload: newGoals,
      })
    }
  }

  return (
    <div className="goals-section">
      <GoalsInput/>
      <div className="goals-background">
        <div className="goals-top">
        <GoalsOrderSelect orderArray={orderArray}/>
        <a href="www.temporarygoallink.com">See all</a>
        </div>
        <div className ="goals-content">
          <GoalsContent goals={goals} setStars={setStars}/>
        </div>
      </div>
    </div>
  );
}

export default Goals;