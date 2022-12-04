import { GrSearch } from "react-icons/gr"
import { useRef } from "react";

export default function PoetrySearch({ handleChange, handleClick, matches }) {

    const ref = useRef(null)

    const handleRef = () => {
        ref.current.value = '';
    }

    return <>
        <div className="poetryPage-search">
            <h2>Reading list</h2>
            <div className="poetryPage-search-bar">
                <GrSearch />
                <input type="text" onBlur={handleChange} ref={ref}></input>
            </div>
            <button name="search" onClick={handleClick}>Search</button>
            <button name="reset" onClick={handleRef}>Reset</button>
        </div>
        {matches > 0 ? matches > 1 ? <p>{matches} matches</p> : <p>{matches} match</p> : <></>}
    </>
}