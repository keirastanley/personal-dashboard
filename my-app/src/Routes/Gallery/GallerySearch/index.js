import { GrSearch } from "react-icons/gr"
import { useRef } from "react";

export default function GallerySearch({ handleChange, handleClick, matches, resetArt }) {

    const ref = useRef(null)

    const handleRef = () => {
        // ref.current.value = '';
    }

    return <>
        <div className="galleryPage-search">
            <h2>Gallery</h2>
            <div className="galleryPage-search-bar">
                <GrSearch />
                <input type="text" onBlur={handleChange} ref={ref}></input>
            </div>
            <div className="galleryPage-search-buttons">            
            <button name="search" onClick={handleClick}>Search</button>
            <button name="reset" onClick={() => {handleRef(); resetArt()}}>Reset</button></div>
        </div>
        {matches > 0 ? matches > 1 ? <p>{matches} matches</p> : <p>{matches} match</p> : <></>}
    </>
}