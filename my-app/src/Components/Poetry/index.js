import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoBook } from "react-icons/go";
import { TbRefresh } from "react-icons/tb";
import { v4 as uuidv4 } from 'uuid';
import "./index.css";
import poems from "./poems";

function Poetry({className}) {

  const [toggle, setToggle] = useState(false);
  const [heart, setHeart] = useState(<AiOutlineHeart id="heart-icon" />);
  const [ind, setInd] = useState(0)
  const [isHovering, setIsHovering] = useState(false);

  function handleHeart() {
    setToggle(!toggle);
    if (toggle) {
      setHeart(<AiFillHeart id="poetry-heart-icon-filled" />);
    } else {
      setHeart(<AiOutlineHeart id="poetry-heart-icon" />);
    }
  }

  function handleRefresh(){
    const randomNumber = Math.floor(Math.random() * poems.length);
    setInd(randomNumber)
  }

  function Lines(){
      if (isHovering) {
        return poems[ind].lines.map(line => <li key={uuidv4()}>{line}</li>)
      }
      else {
        const lines = poems[ind].lines.filter((line, ind) => ind < 4);
        return lines.map(line => <li key={uuidv4()}>{line}</li>)
      }
  }

  function toLower(text){
    return text.toLowerCase()
}

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return (
    <div className="poetry-container">
        <div className="poetry-info">
          <div className="poetry-text" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <p className="poetry-title"><i>{poems[ind].title}</i> by <i>{poems[ind].author}</i></p>
              <ul className="poetry-lines"><Lines/></ul>
        </div>
      <div className="poetry-icons">
        <button onClick={handleHeart}>{heart}</button>
        <button>
        <Link to={`poetry`}>
          <GoBook id="poetry-book-icon"/>
        </Link>        
        </button>
        <button>
          <TbRefresh id="poetry-refresh-icon" onClick={handleRefresh} />
        </button>
      </div>
      </div>
    </div>
  );
}

export default Poetry;
