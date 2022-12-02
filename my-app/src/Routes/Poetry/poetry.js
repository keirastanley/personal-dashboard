import "./index.css"
import PoetryCard from "./PoetryCard"
import PoetrySearch from "./PoetrySearch"
import poems from "../../Components/Poetry/poems";
import { useState, useEffect } from "react";

export default function PoetryPage(){
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([])
    const [newPoems, setNewPoems] = useState(poems)
    const [highlight, setHighlight] = useState("")

    function handleChange(event){
        setSearchTerm(toLower(event.target.value))
    }
    
    function handleClick(){
    let newResults = [];
       poems.map((poem, index) => {
        if (toLower(poem.title).includes(searchTerm)){
            return newResults = [...newResults, poem]
        }
        if (toLower(poem.author).includes(searchTerm)){
            return newResults = [...newResults, poem]
        }
        poem.lines.map(line => {
            if (toLower(line).includes(searchTerm)){
                return newResults = [...newResults, poem]
            }
        })
       })
       console.log(newResults)
        setResults(newResults)
        setNewPoems(newResults)
    }

    function toLower(text){
        return text.toLowerCase()
    }

    return <div className="poetryPage">
        <PoetrySearch handleChange={handleChange} handleClick={handleClick}/>
        <PoetryCard poems={newPoems} searchTerm={searchTerm} results={results}/>
    </div>
}