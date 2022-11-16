import "./index.css"

function GoalsInput(){
    return <div className="goals-input-section">
                <h3>My Goals</h3>
                <input type="text" placeholder="Enter a goal..."></input>
                <input type="text" placeholder="(Optional) Enter a link.."></input>
                <button>Add new</button>
            </div>
}

export default GoalsInput;