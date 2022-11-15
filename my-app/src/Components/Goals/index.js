import "./index.css";
import { IoStarSharp } from "react-icons/io5";
import { useState } from "react";

const goals = [
  { goal: "Learn Algebra", starred: false, progress: 0, id: 1 },
  { goal: "Create a personal portfolio", starred: false, progress: 0, id: 2 },
  { goal: "Reach 4kyu on Codewars", starred: false, progress: 0, id: 3 },
  { goal: "Learn to play tennis", starred: false, progress: 0, id: 4 },
  { goal: "Exercise everyday", starred: false, progress: 0, id: 5 },
];

function Goals() {

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
        <select name="goals-order">
          <option>Order by</option>
          <option value="name">Name</option>
          <option value="starred">Starred</option>
          <option value="progress">Progress</option>
        </select>
        <a href="www.temporarygoallink.com">See all</a>
        </div>
        <div className ="goals-content">
            <ul>
            {goals.map((goal) => (
                <li key={goal.id}>
                <IoStarSharp className="star-icon"/> {goal.goal}
                <div className="progress"></div>
                </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Goals;
