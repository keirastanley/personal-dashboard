import { useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import IdeasInput from "./Ideas Input";
import "./index.css"

const initialIdeas = [
    {idea: "Play a game of chess", href: "www.lichess.com"},
    {idea: "Practise on Codewars", href: "www.codewars.com"},
    {idea: "Read a book", href: null},
    {idea: "Clean the kitchen", href: null},
    {idea: "Make a dessert", href: null},
    {idea: "Paint nails", href: null},
    {idea: "Play the piano", href: null},
    {idea: "Tidy your room", href: null},
    {idea: "Do laundry", href: null},
    {idea: "Yoga or stretching", href: "https://www.youtube.com/c/yogawithadriene"}
]

function Ideas({className}){
    const [ideas, setIdeas] = useState(initialIdeas)
    const [idea, setIdea] = useState(ideas[0])
    const [text, setText] = useState("")
    const [link, setLink] = useState("")

    function handleChange(event){
        if (event.target.name === "idea-text-input"){
            setText(event.target.value)
        }
        if (event.target.name === "idea-link-input"){
            setLink(event.target.value)
        }
    }

    function handleClick(){
        const newIdeas = [...ideas, {idea: text, href: link}]
        setIdeas(newIdeas)
    }

    function handleRefresh(){
        const randomNumber = Math.floor(Math.random() * (ideas.length))
        setIdea(ideas[randomNumber])
    }

    return <div className={className + "-container"}>
        <div className={className + "-top"}>
            <h3>Something to do...</h3>
            <button onClick={handleRefresh}><TbRefresh className={className + "-refresh"} onClick={handleRefresh}/></button>
        </div>
        <div className={className + "-idea"}>
            <a href={idea.link}>{idea.idea}</a>
            <RiDeleteBinLine/>
        </div>
            <IdeasInput handleChange={handleChange} handleClick={handleClick} className={className}/>
            {className === "ideasPage" ? <ul>{ideas.map(el => <li>{el.idea} <RiDeleteBinLine/></li>)}</ul> : null}
    </div>
}

export default Ideas;