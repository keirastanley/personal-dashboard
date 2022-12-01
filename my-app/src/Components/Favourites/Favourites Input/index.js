function FavouritesInput({ handleChange, handleClick, className }) {
  return (
    <div className={className + "-input-section"}>
      <input
        type="text"
        placeholder="Enter a link..."
        name="favourites-link"
        className={className + "-link-input"}
        onChange={handleChange}
      ></input>
      <input
        type="text"
        placeholder="Display as.."
        name="favourites-display"
        className={className + "-display-input"}
        onChange={handleChange}
      ></input>
      <button onClick={handleClick}>Add new</button>
    </div>
  );
}

export default FavouritesInput;
