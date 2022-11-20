export default function IdeasInput({ handleChange, handleClick }) {
  return (
    <div className="ideas-input">
      <a href="www.temporarylink.com">See all</a>
      <input
        name="idea-text-input"
        placeholder="Enter an idea..."
        className="idea-input"
        onChange={handleChange}
      ></input>
      <input
        name="idea-link-input"
        placeholder="(Optional) Enter a link"
        className="idea-link-input"
        onChange={handleChange}
      ></input>
      <button onClick={handleClick}>Add new</button>
    </div>
  );
}
