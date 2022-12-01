import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import {v4 as uuidv4} from "uuid"

function FavouritesList({favourites, setStars, handleDelete, className}){
    return <div className={className}>
    <ul>
        {favourites.map(favourite => 
        <li key={uuidv4()}>
            <div className="fave-star">
                <IoStarSharp 
                    className={favourite.className}                 
                    id={favourite.id}
                    onClick={setStars}/>
                <a href={favourite.href}>{favourite.display}</a>
            </div>
            <RiDeleteBinLine onClick={handleDelete} id={favourite.id}/>
        </li>)}
    </ul>
</div>
}

export default FavouritesList;