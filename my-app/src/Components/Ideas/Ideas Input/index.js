export default function IdeasInput({ handleChange, handleClick, className }) {
  return (
    <div className={className + "-input"}>
      {className === "ideas" ? <a href="www.temporarylink.com">See all</a> : null}
      <input
        name="idea-text-input"
        placeholder="Enter an idea..."
        className={className + "-idea-input"}
        onChange={handleChange}
      ></input>
      <input
        name={className + "-link-input"}
        placeholder="(Optional) Enter a link"
        className="idea-link-input"
        onChange={handleChange}
      ></input>
      <button onClick={handleClick}>Add new</button>
    </div>
  );
}
