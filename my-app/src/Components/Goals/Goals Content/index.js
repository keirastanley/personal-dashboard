import { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai"
import "./index.css"

function GoalsContent({goals, setStars}){
    const [newGoals, setGoals] = useState(goals);

    function handleClick(event){
      let compare = 0;
      let action = "";
      if (event.target.id.length < 1){
        compare = Number(event.target.parentElement.id.split("").filter(el => Number.isInteger(Number(el))).join(""))
        action = event.target.parentElement.id.split("").filter(el => Number.isInteger(Number(el)) === false).join("");
      }
      else {
        compare = Number(event.target.id.split("").filter(el => Number.isInteger(Number(el))).join(""))
        action = event.target.id.split("").filter(el => Number.isInteger(Number(el)) === false).join("");
      }
      newGoals.map((goal, ind, arr) => { 
        if (compare === goal.id){
          switch (action){
            case "plus":
              if (goal.progress <= 10){
                const plusGoal = {...goal}
                plusGoal.progress++
                plusGoal.classNameP = `progress-${plusGoal.progress}`;
                const goalsPlus = [...arr.slice(0 , ind), plusGoal, ...arr.slice(ind+1)]
                setGoals(goalsPlus);
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
                setGoals(goalsMinus);
                return goal;
              }
              else {
                return goal;
              }
            case "delete":
              const goalsDelete = [...arr.slice(0 , ind), ...arr.slice(ind+1)]
              setGoals(goalsDelete)
              return goal;
            default:
              return goal;
          }
        }})
    }

    return <ul>{newGoals.map((goal) => (
        <li key={goal.id}>
          <div className ="list-item-container">
            <div className = "goal-star">
              <IoStarSharp 
                className={goal.className} 
                id={goal.id} 
                onClick={setStars}
              />
              {goal.goal}
            </div>
            <div className="progress-buttons">
              <div className="progress">
                <div 
                    className={`progress-${goal.progress}`} 
                    id={`progress-${goal.id}`}
                    >
                </div>
              </div>
              <AiOutlinePlusSquare 
                className="progress-update" 
                onClick={handleClick} 
                id={`plus${goal.id}`}
                />
              <AiOutlineMinusSquare 
                className="progress-update" 
                onClick={handleClick} 
                id={`minus${goal.id}`}
                />
              <RiDeleteBinLine
                onClick={handleClick}  
                id={`delete${goal.id}`}
                />
            </div>
          </div>
        </li>))}
    </ul>
}

export default GoalsContent;