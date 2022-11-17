import "./index.css"

function Favourites(){
    return <div className="favourites-container">
                <h3>Favourites</h3>
                <div className="favourites-top-level">
                    <a href="www.temporarylink.com">See all</a>
                    <select name="favourites-order">
                        <option>Order by</option>
                        <option value="name">Name</option>
                        <option value="starred">Starred</option>
                    </select>
                </div>
                <div className="favourites-input-section">
                    <input type="text" placeholder="Enter a link..." name="link" className="favourites-link-input"></input>
                    <input type="text" placeholder="Display as.." name="name" className="favourites-display-input"></input>
                    <button>Add new</button>
                </div>
            </div>
}

export default Favourites;