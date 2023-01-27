function GoalsInput({handleInput, handleClick, className}){
    return <div className={className + "-input-section"}>
                <h3>My Goals</h3>
                <input name="goal" type="text" placeholder="Enter a goal..." onChange={handleInput}></input>
                <input name="goal-link" type="text" placeholder="(Optional) Enter a link.." onChange={handleInput}></input>
                <button onClick={handleClick}>Add new</button>
            </div>
}

export default GoalsInput;