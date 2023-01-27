import "./index.css"
import PoetryCard from "./PoetryCard"
import PoetrySearch from "./PoetrySearch"
import { useState, useEffect } from "react";

export default function PoetryPage(){
    const [poems, setPoems] = useState([])
    const [initialPoems, setInitialPoems] = useState(poems)
    const [searchTerm, setSearchTerm] = useState("");
    const [matches, setMatches] = useState(0)

    async function getPoems(){
        console.log("something happening?")
        const data = await fetch('https://personal-dashboard.onrender.com/api/poems/',
        {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        const response = await data.json();
        setPoems(response.payload)
        setInitialPoems(response.payload)
    };

    async function deletePoem(id){
        await fetch(`https://personal-dashboard.onrender.com/api/poems/${id}`,
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        }).then(getPoems())
    };

    useEffect(() => {
        getPoems()
    }, [])

    function handleChange(event){
        let search = toLower(event.target.value).split(" ");
        setSearchTerm(search.filter(el => /^[A-Za-z]+$/.test(el)))
    }

    function resetPoems(){
        getPoems();
    }

    function handleDelete(event){
        if (window.confirm(`Do you want to remove ${event.target.name} from your reading list?`)){
            deletePoem(event.target.id);
        }
    }

    function handleClick(){
        let titleIndexes = []
        let titleResults = []
        let authorIndexes = []
        let authorResults = []
        let lineIndexes = []
        let lineResults = []
        let matchPoem;
        let matches = 0;
        let newPoems = [...initialPoems]
        for (let i = 0; i < initialPoems.length; i++){
            const titleArr = initialPoems[i].title.split(" ").map(el => onlyAlph(toLower(el)))
            const authorArr = initialPoems[i].author.split(" ").map(el => onlyAlph(toLower(el)))
            if ((titleArr.map(el => searchTerm.some(el2 => el2 === el)).includes(true))) {
                matchPoem = newPoems[i];
                titleIndexes = searchTerm.map(el => titleArr.indexOf(el)).filter(el2 => el2 >= 0)
                titleResults = newPoems[i].title.split(" ").filter((el, ind) => titleIndexes.includes(ind))
                let newTitle = highlightMatch(newPoems[i].title, titleIndexes, titleResults)
                matchPoem = {...matchPoem, title: newTitle}
                newPoems = [...newPoems.slice(0, i), matchPoem, ...newPoems.slice(i + 1)]
                matches++;
            }
            if ((authorArr.map(el => searchTerm.some(el2 => el2 === el)).includes(true))) {
                matchPoem = newPoems[i];
                authorIndexes = searchTerm.map(el => authorArr.indexOf(el)).filter(el2 => el2 >= 0)
                authorResults = newPoems[i].author.split(" ").filter((el, ind) => authorIndexes.includes(ind))
                let newAuthor = highlightMatch(newPoems[i].author, authorIndexes, authorResults)
                matchPoem = {...matchPoem, author: newAuthor}
                newPoems = [...newPoems.slice(0, i), matchPoem, ...newPoems.slice(i + 1)]
                matches++;
            }
            for (let j = 0; j < initialPoems[i].lines.length; j++){
                const linesArr = initialPoems[i].lines[j].split(" ").map(el => onlyAlph(toLower(el)))
                if ((linesArr.map(el => searchTerm.some(el2 => el2 === el)).includes(true))) {
                    console.log(initialPoems[i].lines[j])
                    matchPoem = newPoems[i];
                    lineIndexes = searchTerm.map(el => linesArr.indexOf(el)).filter(el2 => el2 >= 0)
                    lineResults = newPoems[i].lines[j].split(" ").filter((el, ind) => lineIndexes.includes(ind))
                    let newLine = highlightMatch(newPoems[i].lines[j], lineIndexes, lineResults)
                    let newLines = [...newPoems[i].lines.slice(0, j), newLine, ...newPoems[i].lines.slice(j + 1)]
                    matchPoem = {...matchPoem, lines: newLines}
                    newPoems = [...newPoems.slice(0, i), matchPoem, ...newPoems.slice(i + 1)]
                    matches++;
                }
            }
        }
        setPoems(reorderMatches(newPoems))
        setMatches(matches);
    }    

    function highlightMatch(text, indexes, results){
        return <span> {text.split(" ").slice(0, indexes[0]).join(" ")} <span className="highlighted">{results.join(" ")} </span> {text.split(" ").slice(indexes[indexes.length - 1] + 1).join(" ")} </span>
    }

    function reorderMatches(poems){
        let matchPoems = poems.filter(el => typeof(el.title) === "object" || typeof(el.author) === "object" || el.lines.some(el2 => typeof(el2) === "object"))
        let nonMatchPoems = poems.filter(el => typeof(el.title) === "string" && typeof(el.author) === "string" && el.lines.every(el2 => typeof(el2) === "string"))
        return [...matchPoems, ...nonMatchPoems]
    }

    function toLower(text){
        return text.toLowerCase()
    }

    function onlyAlph(text){
        return text.replace(/[^\w\s']|_/g, "").replace(/[.,#!$%^&*;:{}=\-_'`~()]/g, "").replace(/\s+/g, " ")
    }

    return <div className="poetryPage">
        <PoetrySearch handleChange={handleChange} handleClick={handleClick} searchTerm={searchTerm} matches={matches} resetPoems={resetPoems}/>
        <PoetryCard poems={poems} handleDelete={handleDelete}/>
    </div>
}