import "./index.css";
import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai"
import { useState, useReducer } from "react";

const initialGoals = [
  { goal: "Learn Algebra", starred: false, className: "star-icon", progress: 0, id: 1 },
  { goal: "Create a personal portfolio", starred: false, className: "star-icon", progress: 0, id: 2 },
  { goal: "Reach 4kyu on Codewars", starred: false, className: "star-icon", progress: 0, id: 3 },
  { goal: "Learn to play tennis", starred: false, className: "star-icon", progress: 0, id: 4 },
  { goal: "Exercise everyday", starred: false, className: "star-icon", progress: 0, id: 5 },
];

function Goals() {
  const [toggle, setToggle] = useState(true);
  const [star, setStarOld] = useState("star-icon")

  const [goals, dispatch] = useReducer(setGoals, initialGoals);

  function setGoals(state, action){
    console.log(state, action)
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
          setToggle(!goal.starred)
          goal.starred = !goal.starred;
          console.log(goal)
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
      <div className="goals-input-section">
        <h3>My Goals</h3>
        <input type="text" placeholder="Enter a goal..."></input>
        <input type="text" placeholder="(Optional) Enter a link.."></input>
        <button>Add new</button>
      </div>
      <div className="goals-background">
        <div className="goals-top">
        <select name="goals-order" onChange={orderArray}>
          <option>Order by</option>
          <option value="name">Name</option>
          <option value="starred">Starred</option>
          <option value="progress">Progress</option>
        </select>
        <a href="www.temporarygoallink.com">See all</a>
        </div>
        <div className ="goals-content">
            <ul>{goals.map((goal) => (
                <li key={goal.id}>
                  <div className ="list-item-container">
                    <div className = "goal-star">
                      <IoStarSharp className={goal.className} id={goal.id} onClick={setStars}/> {goal.goal}
                    </div>
                    <div className="progress-buttons">
                      <div className="progress"></div>
                      <AiOutlinePlusSquare className="progress-update"/>
                      <AiOutlineMinusSquare className="progress-update"/>
                      <RiDeleteBinLine/>
                    </div>
                  </div>
                </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Goals;