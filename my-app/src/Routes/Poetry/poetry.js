import "./index.css"
import PoetryCard from "./PoetryCard"
import PoetrySearch from "./PoetrySearch"
import {default as initialPoems} from "../../Components/Poetry/poems";
import { useState, useEffect } from "react";

export default function PoetryPage(){
    const [searchTerm, setSearchTerm] = useState([]);
    // const [results, setResults] = useState([])
    const [poems, setPoems] = useState(initialPoems)
    const [matches, setMatches] = useState(0)

    function handleChange(event){
        let search = toLower(event.target.value).split(" ");
        setSearchTerm(search.filter(el => /^[A-Za-z]+$/.test(el)))
    }

    function resetPoems(){
        setPoems(initialPoems);
    }

    useEffect(() => {
        console.log("matches", matches)
    }, [matches])


    function handleClick(){
        let matchCounter = 0;
        let poemIndex, matchPoem, titleCompare, authorCompare, linesCompare, lineIndex;
        let titleResults = [];
        let titleIndexes = [];
        let authorResults = [];
        let authorIndexes = [];
        let lineResults = [];
        let lineIndexes = [];
        let newPoems = [...initialPoems];
        for (let i = 0; i < initialPoems.length; i++){
            if (titleResults.length < searchTerm.length){
                titleCompare = initialPoems[i].title.split(" ");
                titleResults = [];
                titleIndexes = [];
            }
            else {
                titleCompare = []
            }
            if (authorResults.length < searchTerm.length){
                authorCompare = initialPoems[i].author.split(" ")
                authorResults = [];
                authorIndexes = [];
            }
            else {
                authorCompare = [];
            }
            if (findInArray(titleCompare, searchTerm).match){
                poemIndex = i;
                matchPoem = {...initialPoems[i]}
                titleResults = findInArray(titleCompare, searchTerm).results;
                titleIndexes = findInArray(titleCompare, searchTerm).indexes;
                matchCounter++;
                if (titleResults.length === searchTerm.length){
                    let newTitle = highlightMatch(matchPoem, titleIndexes, titleResults)
                    matchPoem = {...matchPoem, title: newTitle}
                    newPoems = [...newPoems.slice(0, poemIndex), matchPoem, ...newPoems.slice(poemIndex + 1)]
                    setPoems(reorderMatches(newPoems))
                    titleResults = []
                    titleIndexes = []
                }
            }
            if (findInArray(authorCompare, searchTerm).match) {
                poemIndex = i;
                matchPoem = {...initialPoems[i]}
                authorResults = findInArray(authorCompare, searchTerm).results;
                authorIndexes = findInArray(authorCompare, searchTerm).indexes;
                matchCounter++;
                if (authorResults.length === searchTerm.length){
                    let newAuthor = highlightMatch(matchPoem, authorIndexes, authorResults)
                    matchPoem = {...matchPoem, author: newAuthor}
                    newPoems = [...newPoems.slice(0, poemIndex), matchPoem, ...newPoems.slice(poemIndex + 1)]
                    setPoems(reorderMatches(newPoems))
                    authorResults = []
                    authorIndexes = []
                }
            }
            for (let k = 0; k < initialPoems[i].lines.length; k++){
                if (lineResults.length < searchTerm.length){
                    linesCompare = initialPoems[i].lines[k].split(" ")
                    lineResults = [];
                    lineIndexes = [];
                }
                else {
                    linesCompare = []
                }
                if (findInArray(linesCompare, searchTerm).match) {
                    poemIndex = i;
                    matchPoem = {...initialPoems[i]}
                    lineIndex = k;
                    lineResults = findInArray(linesCompare, searchTerm).results;
                    lineIndexes = findInArray(linesCompare, searchTerm).indexes;
                    matchCounter++;
                    if (lineResults.length === searchTerm.length){
                        let newLine = <span> {matchPoem.lines[lineIndex].split(" ").slice(0, lineIndexes[0]).join(" ")} <span className="highlighted">{lineResults.join(" ")} </span> {matchPoem.lines[lineIndex].split(" ").slice(lineIndexes[lineIndexes.length - 1] + 1).join(" ")} </span>
                        let newLines = [...newPoems[poemIndex].lines.slice(0, lineIndex), newLine, ...newPoems[poemIndex].lines.slice(lineIndex + 1)]
                        matchPoem = {...matchPoem, lines: newLines}
                        newPoems = [...newPoems.slice(0, poemIndex), matchPoem, ...newPoems.slice(poemIndex + 1)]
                        setPoems(reorderMatches(newPoems))
                        lineResults = []
                        lineIndexes = []
                        lineIndex = null
                    }
                }
            }
        }
        if (matchCounter < 1){
            setPoems(initialPoems);
        }
        console.log(matchPoem)
        setMatches(matchCounter);
    }    

    function findInArray(array, toMatch){
        let results = [];
        let resultIndexes = [];
        for (let i = 0; i < toMatch.length; i++){
            for (let j = 0; j < array.length; j++){
                if (toLower(array[j]).replace(/[^\w\s']|_/g, "").replace(/[.,#!$%^&*;:{}=\-_'`~()]/g, "").replace(/\s+/g, " ") === toMatch[i].replace(/[^\w\s']|_/g, "").replace(/\s+/g, " ")){
                    let testArr = array.slice(j, toMatch.length + j)
                    let testIndexes = [];
                    for (let w = 0; w < toMatch.length; w++){
                        testIndexes = [...testIndexes, w + j];
                    }
                    for (let x = 0; x < testArr.length; x++){
                        if (toLower(testArr[x]).replace(/[^\w\s']|_/g, "").replace(/[.,#!$%^&*;:{}=\-_'`~()]/g, "").replace(/\s+/g, " ") !== toMatch[x].replace(/[^\w\s']|_/g, "").replace(/\s+/g, " ")) {
                            results = [];
                            resultIndexes = [];
                        }
                        else {
                            results = [...results, testArr[x]];
                            resultIndexes = [...resultIndexes, testIndexes[x]]
                            if (results.length === toMatch.length){
                                return {match: true, results: results, indexes: resultIndexes}
                            }
                        }
                    }
                }
            }
        }
        return {match: false, results: results, indexes: resultIndexes}
    }

    function highlightMatch(poem, indexes, results){
        return <span> {poem.title.split(" ").slice(0, indexes[0]).join(" ")} <span className="highlighted">{results.join(" ")} </span> {poem.title.split(" ").slice(indexes[indexes.length - 1] + 1).join(" ")} </span>
    }

    function reorderMatches(poems){
        let matchPoems = poems.filter(el => typeof(el.title) === "object" || typeof(el.author) === "object" || el.lines.some(el2 => typeof(el2) === "object"))
        let nonMatchPoems = poems.filter(el => typeof(el.title) === "string" && typeof(el.author) === "string" && el.lines.every(el2 => typeof(el2) === "string"))
        return [...matchPoems, ...nonMatchPoems]
    }

    function toLower(text){
        return text.toLowerCase()
    }

    return <div className="poetryPage">
        <PoetrySearch handleChange={handleChange} handleClick={handleClick} searchTerm={searchTerm} matches={matches} resetPoems={resetPoems}/>
        <PoetryCard poems={poems}/>
    </div>
}