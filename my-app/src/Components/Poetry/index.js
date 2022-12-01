import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoBook } from "react-icons/go";
import { TbRefresh } from "react-icons/tb";
import { v4 as uuidv4 } from 'uuid';
import "./index.css";
import poems from "./poems";

function Poetry() {
  const [toggle, setToggle] = useState(false);
  const [heart, setHeart] = useState(<AiOutlineHeart id="heart-icon" />);
  const [id, setId] = useState(0)
  const [isHovering, setIsHovering] = useState(false);

  function handleHeart() {
    setToggle(!toggle);
    if (toggle === true) {
      setHeart(<AiFillHeart id="poetry-heart-icon-filled" />);
    } else {
      setHeart(<AiOutlineHeart id="poetry-heart-icon" />);
    }
  }

  function handleRefresh(){
    const randomNumber = Math.floor(Math.random() * poems.length);
    setId(randomNumber)
  }

  function Lines({isHovering}){
    if (isHovering) {
      return poems[id].lines.map(line => <li key={uuidv4()}>{line}</li>)
    }
    else {
      const lines = poems[id].lines.filter((line, ind) => ind < 4);
      return lines.map(line => <li key={uuidv4()}>{line}</li>)
    }
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
            <p><i>{poems[id].title}</i> by <i>{poems[id].author}</i></p>
              <ul className="lines"><Lines isHovering={isHovering}/></ul>
        </div>
      <div className="poetry-icons">
        <button onClick={handleHeart}>{heart}</button>
        <button>
          <GoBook id="poetry-book-icon" />
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
