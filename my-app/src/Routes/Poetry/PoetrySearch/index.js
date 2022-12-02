import { GrSearch } from "react-icons/gr"

export default function PoetrySearch({handleChange, handleClick}){
    return <div className="poetryPage-search">
    <h2>Reading list</h2>
    <div className="poetryPage-search-bar">
    <GrSearch/>
    <input type="text" onBlur={handleChange}></input>
    </div>
    <button onClick={handleClick}>Search</button>
    </div>
}