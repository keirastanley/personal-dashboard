import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import {v4 as uuidv4} from "uuid"

function FavouritesList({favourites, setStars}){
    return <div className="favourites">
    <ul>
        {favourites.map(favourite => 
        <li key={uuidv4()}>
            <IoStarSharp 
                className={favourite.className}                 
                id={favourite.id}
                onClick={setStars}/>
            <a href={favourite.href}>{favourite.display}</a>
        </li>)}
    </ul>
</div>
}

export default FavouritesList;