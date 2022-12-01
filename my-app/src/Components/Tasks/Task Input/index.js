export default function TaskInput({handleChange, handleSubmit, className}) {
  return (
    <div className={className + "-input-section"}>
      <input onChange={handleChange}
        className={className + "-text-input"}
        type="text"
        name="task"
        placeholder="Enter a task..."
      ></input>
      <input type="date" name="task-date" onChange={handleChange}></input>
      <select name="task-priority" onChange={handleChange}>
        <option name="Priority">Priority</option>
        <option value="Low" name="Low">Low</option>
        <option value="Medium" name="Medium">Medium</option>
        <option value="High" name="High">High</option>
      </select>
      <button onClick={handleSubmit}>Add new</button>
    </div>
  );
}
