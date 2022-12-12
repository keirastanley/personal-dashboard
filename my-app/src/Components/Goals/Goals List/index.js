import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import "./index.css";

function GoalsList({ goals, handleProgress, setStars, className }) {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={uuidv4()}>
          <div className={className + "-list-item-container"}>
            <div className="goal-star">
              <IoStarSharp
                className={goal.className}
                id={goal.id}
                onClick={setStars}
              />
              <a href={goal.href}>{goal.goal}</a>
            </div>
            <div className="progress-buttons">
              <div className="progress">
                <div
                  className={`progress-${goal.progress}`}
                  id={`progress-${goal.id}`}
                ></div>
              </div>
              <AiOutlinePlusSquare
                className="progress-update"
                onClick={handleProgress}
                id={`plus${goal.id}`}
              />
              <AiOutlineMinusSquare
                className="progress-update"
                onClick={handleProgress}
                id={`minus${goal.id}`}
              />
              <RiDeleteBinLine
                onClick={handleProgress}
                id={`delete${goal.id}`}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default GoalsList;
