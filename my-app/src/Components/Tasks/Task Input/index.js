export default function TaskInput({handleChange, handleSubmit}) {
  return (
    <div className="tasks-input-section">
      <input onChange={handleChange}
        className="tasks-text-input"
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
