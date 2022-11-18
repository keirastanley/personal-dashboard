function FavouritesInput({handleChange, handleClick}){
    return <div className="favourites-input-section">
                <input type="text" placeholder="Enter a link..." name="favourites-link" className="favourites-link-input" onChange={handleChange}></input>
                <input type="text" placeholder="Display as.." name="favourites-display" className="favourites-display-input" onChange={handleChange}></input>
                <button onClick={handleClick}>Add new</button>
            </div>
}

export default FavouritesInput;