import { useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import "./index.css"

const ideas = [
    "Play a game of chess",
    "Practise on Codewars",
    "Play a game of chess",
    "Read a book",
    "Clean the kitchen",
    "Make a dessert",
    "Paint nails",
    "Play the piano",
    "Tidy your room",
    "Do laundry",
    "Yoga or stretching"
]

function Ideas(){

    const [idea, setIdea] = useState(ideas[0])

    function handleClick(){
        const randomNumber = Math.floor(Math.random() * (ideas.length))
        setIdea(ideas[randomNumber])
    }

    return <div className="ideas-container">
        <div className="ideas-top">
            <h3>Something to do...</h3>
            <button onClick={handleClick}><TbRefresh className="ideas-refresh" onClick={handleClick}/></button>
        </div>
        <div className="idea">
            <p>{idea}</p>
            <RiDeleteBinLine/>
        </div>
        <a href="www.temporarylink.com">See all</a>
        <div className="ideas-input">
            <input placeholder="Enter an idea..." className="idea-input"></input>
            <input placeholder="(Optional) Enter a link" className="idea-link-input"></input>
            <button>Add new</button>
        </div>
    </div>
}

export default Ideas;