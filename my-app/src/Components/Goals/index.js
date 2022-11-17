import "./index.css";
import initialGoals from "./goals";
import GoalsList from "./Goals List";
import GoalsInput from "./Goals Input";
import GoalsOrderSelect from "./Goals Order Select";
import { useState, useReducer } from "react";

function Goals() {
  const [goals, dispatch] = useReducer(setGoals, initialGoals);
  const [goal, setGoal] = useState("");
  const [link, setLink] = useState("");
  const [count, setCount] = useState(initialGoals.length + 1);

  //NEW GOALS ADDED HAVE NON-FUNCTIONAL BUTTONS
  console.log(goals)

  function setGoals(state, action) {
    switch (action.type) {
      case "ADDED_NEW_GOAL":
        return action.payload;
      case "SET_STARS":
        return action.payload;
      case "ORDER_BY_NAME":
        return action.payload;
      case "ORDER_BY_STAR":
        return action.payload;
      case "ORDER_BY_PROGRESS":
        return action.payload;
      case "PLUS":
        return action.payload;
      case "MINUS":
        return action.payload;
      case "DELETE":
        return action.payload;
      default:
        return state;
    }
  }

  function handleInput(event) {
    if (event.target.name === "goal") {
      setGoal(event.target.value);
    }
    if (event.target.name === "goal-link") {
      setLink(event.target.value);
    }
  }

  function handleClick() {
    const newGoal = {
      goal: goal,
      starred: false,
      className: "star-icon",
      progress: 0,
      classNameP: "progress-1",
      href: link,
      id: count,
    };
    const goalsAdded = [...goals, newGoal];
    setCount(count+1)
    dispatch({
      type: "ADDED_NEW_GOAL",
      payload: goalsAdded,
    });
  }

  function handleProgress(event) {
    let compare = 0;
    let action = "";
    if (event.target.id.length > 0) {
      compare = Number(
        event.target.id
          .split("")
          .filter((el) => Number.isInteger(Number(el)))
          .join("")
      );
      action = event.target.id
        .split("")
        .filter((el) => Number.isInteger(Number(el)) === false)
        .join("");
    } else {
      if (event.target.parentElement.id.length > 0) {
        compare = Number(
          event.target.parentElement.id
            .split("")
            .filter((el) => Number.isInteger(Number(el)))
            .join("")
        );
        action = event.target.parentElement.id
          .split("")
          .filter((el) => Number.isInteger(Number(el)) === false)
          .join("");
      } else {
        compare = Number(
          event.target.parentElement.parentElement.id
            .split("")
            .filter((el) => Number.isInteger(Number(el)))
            .join("")
        );
        action = event.target.parentElement.parentElement.id
          .split("")
          .filter((el) => Number.isInteger(Number(el)) === false)
          .join("");
      }
    }
    goals.map((goal, ind, arr) => {
      if (compare === goal.id) {
        switch (action) {
          case "plus":
            if (goal.progress <= 10) {
              const plusGoal = { ...goal };
              plusGoal.progress++;
              plusGoal.classNameP = `progress-${plusGoal.progress}`;
              const goalsPlus = [
                ...arr.slice(0, ind),
                plusGoal,
                ...arr.slice(ind + 1),
              ];
              dispatch({
                type: "PLUS",
                payload: goalsPlus,
              });
              return goal;
            } else {
              return goal;
            }
          case "minus":
            if (goal.progress >= 0) {
              const minusGoal = { ...goal };
              minusGoal.progress--;
              minusGoal.classNameP = `progress-${minusGoal.progress}`;
              const goalsMinus = [
                ...arr.slice(0, ind),
                minusGoal,
                ...arr.slice(ind + 1),
              ];
              dispatch({
                type: "PLUS",
                payload: goalsMinus,
              });
              return goal;
            } else {
              return goal;
            }
          case "delete":
            const goalsDelete = [...arr.slice(0, ind), ...arr.slice(ind + 1)];
            dispatch({
              type: "PLUS",
              payload: goalsDelete,
            });
            return goal;
          default:
            return goal;
        }
      }
      return goals;
    });
  }

  function setStars(event) {
    const newGoals = goals.map((goal) => {
      if (Number(event.target.parentElement.id) === goal.id) {
        goal.starred = !goal.starred;
        if (goal.starred === true) {
          goal.className = "star-icon-selected";
        } else {
          goal.className = "star-icon";
        }
      }
      return goal;
    });
    dispatch({
      type: "SET_STARS",
      payload: newGoals,
    });
  }

  function orderArray(event) {
    if (event.target.value === "name") {
      const newGoals = [
        ...goals.sort((a, b) =>
          a.goal > b.goal ? 1 : b.goal > a.goal ? -1 : 0
        ),
      ];
      dispatch({
        type: "ORDER_BY_NAME",
        payload: newGoals,
      });
    }
    if (event.target.value === "starred") {
      const newGoals = [
        ...goals.filter((goal) => goal.starred === true),
        ...goals.filter((goal) => goal.starred === false),
      ];
      dispatch({
        type: "ORDER_BY_STAR",
        payload: newGoals,
      });
    }
    if (event.target.value === "progress") {
      const goalsProgress = [
        ...goals.sort((a, b) =>
          b.progress - a.progress)];
      dispatch({
          type: "ORDER_BY_PROGRESS",
          payload: goalsProgress,
      });
    }
  }

  return (
    <div className="goals-section">
      <GoalsInput handleInput={handleInput} handleClick={handleClick} />
      <div className="goals-background">
        <div className="goals-top">
          <GoalsOrderSelect orderArray={orderArray} />
          <a href="www.temporarygoallink.com">See all</a>
        </div>
        <div className="goals-content">
          <GoalsList
            goals={goals}
            handleProgress={handleProgress}
            setStars={setStars}
          />
        </div>
      </div>
    </div>
  );
}

export default Goals;
