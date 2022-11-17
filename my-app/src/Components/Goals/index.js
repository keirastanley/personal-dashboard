import "./index.css";
import GoalsList from "./Goals List"
import GoalsInput from "./Goals Input";
import GoalsOrderSelect from "./Goals Order Select";
import { useReducer } from "react";

const initialGoals = [
  { goal: "Learn Algebra", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 1 },
  { goal: "Create a personal portfolio", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 2 },
  { goal: "Reach 4kyu on Codewars", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 3 },
  { goal: "Learn to play tennis", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 4 },
  { goal: "Exercise everyday", starred: false, className: "star-icon", progress: 0, classNameP: "progress-1", id: 5 },
];

function Goals() {

  const [goals, dispatch] = useReducer(setGoals, initialGoals);

  function handleProgress(event){
    let compare = 0;
    let action = "";
    if (event.target.id.length > 0){
      compare = Number(event.target.id.split("").filter(el => Number.isInteger(Number(el))).join(""))
      action = event.target.id.split("").filter(el => Number.isInteger(Number(el)) === false).join("");
    }
    else {
      if (event.target.parentElement.id.length > 0){
        compare = Number(event.target.parentElement.id.split("").filter(el => Number.isInteger(Number(el))).join(""))
        action = event.target.parentElement.id.split("").filter(el => Number.isInteger(Number(el)) === false).join("");
      }
      else {
        compare = Number(event.target.parentElement.parentElement.id.split("").filter(el => Number.isInteger(Number(el))).join(""))
        action = event.target.parentElement.parentElement.id.split("").filter(el => Number.isInteger(Number(el)) === false).join("");
      }
    }
    goals.map((goal, ind, arr) => { 
      if (compare === goal.id){
        switch (action){
          case "plus":
            if (goal.progress <= 10){
              const plusGoal = {...goal}
              plusGoal.progress++
              plusGoal.classNameP = `progress-${plusGoal.progress}`;
              const goalsPlus = [...arr.slice(0 , ind), plusGoal, ...arr.slice(ind+1)]
            dispatch({
                type: "PLUS",
                payload: goalsPlus,
            })
            return goal;
            }
            else {
              return goal;
            }
          case "minus":
            if (goal.progress >= 0) {
              const minusGoal = {...goal}
              minusGoal.progress--
              minusGoal.classNameP = `progress-${minusGoal.progress}`;
              const goalsMinus = [...arr.slice(0 , ind), minusGoal, ...arr.slice(ind+1)]
              dispatch({
                type: "PLUS",
                payload: goalsMinus,
              })
              return goal;
            }
            else {
              return goal;
            }
          case "delete":
            const goalsDelete = [...arr.slice(0 , ind), ...arr.slice(ind+1)]
            dispatch({
                type: "PLUS",
                payload: goalsDelete,
            })
            return goal;
          default:
            return goal;
        }
      }
    return goals})
    }

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
      case "PLUS":
        return action.payload
      case "MINUS":
        return action.payload
      case "DELETE":
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
      console.log(newGoals)
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
          <GoalsList goals={goals} handleProgress={handleProgress} setStars={setStars}/>
        </div>
      </div>
    </div>
  );
}

export default Goals;