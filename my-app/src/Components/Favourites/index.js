import { useState, useReducer } from "react";
import FavouritesList from "./Favourites List";
import FavouritesInput from "./Favourites Input";
import FavouritesOrder from "./Favourites Order Select";
import "./index.css"

const initialFavourites = [
    {
        id: 1,
        href: "https://www.cabinetmagazine.org",
        display: "Cabinet Magazine",
        starred: false,
        className: "star-icon",
    },
    {
        id: 2,
        href: "https://lichess.org",
        display: "LiChess",
        starred: false,
        className: "star-icon",
    },
    {
        id: 3,
        href: "https://www.codewars.com",
        display: "Codewars",
        starred: false,
        className: "star-icon",
    },
]

function Favourites(){
    const [favourites, dispatch] = useReducer(setFavourites, initialFavourites);
    const [display, setDisplay] = useState("");
    const [link, setLink] = useState("");
    const [count, setCount] = useState(initialFavourites.length + 1);

    function setFavourites(state, action){
        switch (action.type){
            case "ADDED_FAVOURITE":
                return action.payload
            case "SET_STARS":
                return action.payload
            case "DELETE":
                return action.payload
            case "ORDER_BY_NAME":
                return action.payload
            case "ORDER_BY_STAR":
                return action.payload
            default:
                return favourites;
        }
    }

    function handleChange(event){
        if (event.target.name === "favourites-link"){
            setLink(event.target.value);
        }
        if (event.target.name === "favourites-display"){
            setDisplay(event.target.value);
        }
    }

    function handleClick(){
        const newObj = {
            id: count,
            href: link,
            display: display,
            starred: false,
            className: "star-icon"
        }
        const newFaves = [...favourites, newObj];
        setCount(count + 1);
        dispatch({
            type: "ADDED_FAVOURITE",
            payload: newFaves
        })
    }

    function setStars(event) {
        const newFaves = favourites.map((favourite) => {
          if (Number(event.target.parentElement.id) === favourite.id) {
            favourite.starred = !favourite.starred;
            if (favourite.starred === true) {
                favourite.className = "star-icon-selected";
            } else {
                favourite.className = "star-icon";
            }
          }
          return favourite;
        });
        dispatch({
          type: "SET_STARS",
          payload: newFaves,
        });
      }

      function handleDelete(event){
        let compare = 0;
        if (event.target.id.length > 0) {
            compare = Number(
                event.target.id
                .split("")
                .filter((el) => Number.isInteger(Number(el)))
                .join(""));
        }
        favourites.map((favourite, ind, arr) => {
            if (compare === favourite.id) {
                if (window.confirm(`Are you sure you want to delete ${favourite.display}?`)){
                    const favesDelete = [...arr.slice(0, ind), ...arr.slice(ind + 1)];
                    dispatch({
                        type: "DELETE",
                        payload: favesDelete,
                    });
                }
            }
        }) 
        }

        function orderArray(event){
            if (event.target.value === "name") {
                const newFaves = [
                  ...favourites.sort((a, b) =>
                    a.display > b.display ? 1 : b.display > a.display ? -1 : 0
                  ),
                ];
                dispatch({
                  type: "ORDER_BY_NAME",
                  payload: newFaves,
                });
              }
              if (event.target.value === "starred") {
                const newFaves = [
                  ...favourites.filter(favourite => favourite.starred === true),
                  ...favourites.filter(favourite => favourite.starred === false),
                ];
                dispatch({
                  type: "ORDER_BY_STAR",
                  payload: newFaves,
                });
              }
        }

    return <div className="favourites-container">
                <h3>Favourites</h3>
                <div className="favourites-top-level">
                    <a href="www.temporarylink.com">See all</a>
                    <FavouritesOrder orderArray={orderArray}/>
                </div>
                <FavouritesList favourites={favourites} setStars={setStars} handleDelete={handleDelete}/>
                <FavouritesInput handleChange={handleChange} handleClick={handleClick}/>
            </div>
}

export default Favourites;