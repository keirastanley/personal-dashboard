import "./index.css"
import PoetryCard from "./PoetryCard"
import PoetrySearch from "./PoetrySearch"
import {default as initialPoems} from "../../Components/Poetry/poems";
import { useState, useEffect } from "react";

export default function PoetryPage(){
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([])
    const [poems, setPoems] = useState(initialPoems)
    const [matches, setMatches] = useState(0)

    function handleChange(event){
        setSearchTerm(toLower(event.target.value).replace(/\s/g, ''));
    }

    // useEffect(() => {
    //     console.log("searchTerm", searchTerm)
    //     console.log("length", searchTerm.length)
    // }, [searchTerm])

    useEffect(() => {
        console.log("matches", matches)
    }, [matches])

    function handleClick(){
        setMatches(0)
        let counter = 0;
        if (searchTerm.length > 0) {
            let newPoems = [...initialPoems];
            newPoems.map((poem, index) => {
                let newPoem = {...poem}
                let newTitle = poem.title
                let newAuthor = poem.author
                let newLines = [...poem.lines]
                if (toLower(newTitle).includes(searchTerm)){
                    let resultIndex = toLower(newTitle).replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ").split(" ").indexOf(searchTerm);
                    let word = newTitle.split(" ")[resultIndex]
                    let untilHighlight = newTitle.split(" ").slice(0, resultIndex).join(" ")
                    let afterHighlight = newTitle.split(" ").slice(resultIndex + 1).join(" ")
                    newTitle = <span>{untilHighlight} <span className="highlighted">{word}</span> {afterHighlight}</span>
                    counter++;
                }
                if (toLower(newAuthor).includes(searchTerm)){
                    let resultIndex = toLower(newAuthor).replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ").split(" ").indexOf(searchTerm);
                    let word = newAuthor.split(" ")[resultIndex]
                    let untilHighlight = newAuthor.split(" ").slice(0, resultIndex).join(" ")
                    let afterHighlight = newAuthor.split(" ").slice(resultIndex + 1).join(" ")
                    newAuthor = <span>{untilHighlight} <span className="highlighted">{word}</span> {afterHighlight}</span>
                    counter++;
                }
                newLines.map((line, ind) => {
                    if (toLower(line).includes(searchTerm)){
                        let resultIndex = toLower(line).replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ").split(" ").indexOf(searchTerm);
                        let word = line.split(" ")[resultIndex]
                        if (word !== undefined) {
                            let untilHighlight = line.split(" ").slice(0, resultIndex).join(" ")
                            let afterHighlight = line.split(" ").slice(resultIndex + 1).join(" ")
                            line = <span>{untilHighlight} <span className="highlighted">{word}</span> {afterHighlight}</span>
                            newLines = [...newLines.slice(0, ind), line, ...newLines.slice(ind + 1)]
                            counter++;
                        }
                    }
                })
                setMatches(counter)
                newPoem = {...newPoem, title: newTitle, author: newAuthor, lines: newLines}
                if ((typeof(newPoem.title) === "object") || (typeof(newPoem.author) === "object")) {
                    newPoems = [newPoem, ...newPoems.slice(0, index), ...newPoems.slice(index + 1)]
                    setPoems(newPoems)
                    return;
                }
                if (newPoem.lines.some(el => typeof(el) === "object")) {
                    newPoems = [newPoem, ...newPoems.slice(0, index), ...newPoems.slice(index + 1)]
                    setPoems(newPoems)
                    return;
                }
            })
        }
    }

    function toLower(text){
        return text.toLowerCase()
    }

    return <div className="poetryPage">
        <PoetrySearch handleChange={handleChange} handleClick={handleClick} searchTerm={searchTerm} matches={matches}/>
        <PoetryCard poems={poems}/>
    </div>
}