import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoBook } from "react-icons/go";
import { TbRefresh } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

function Poetry({ className }) {
  const [toggle, setToggle] = useState(false);
  const [added, setAdded] = useState(false);
  const [poem, setPoem] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  async function getPoem() {
    const response = await fetch("https://poetrydb.org/random");
    const data = await response.json();
    setPoem(data[0]);
  }

  useEffect(() => {
    getPoem();
  }, []);

  async function addNewPoem(poem){
      const data = await fetch('https://personal-dashboard.onrender.com/api/poems',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: poem.title,
          author: poem.author,
          lines: poem.lines
        })
      })
      const response = await data.json();
      console.log(response)
    }

  function handleHeart() {
    if (window.confirm(`Add ${poem.title} by ${poem.author} to your reading list?`)){
      setToggle(true);
      addNewPoem(poem);
      setAdded(true)
    }
    if (added){
      alert(`${poem.title} by ${poem.author} is already in your reading list.`)
    }
  }

  function handleRefresh() {
    setToggle(false);
    getPoem();
  }

  function Lines() {
    if (isHovering) {
      return poem.lines.map((line) => <li key={uuidv4()}>{line}</li>);
    } else {
      const lines = poem.lines.filter((line, ind) => ind < 4);
      return lines.map((line) => <li key={uuidv4()}>{line}</li>);
    }
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="poetry-container">
        <div
          className="poetry-text"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          {poem ? (
            <>
                <i>{poem.title}</i> by <i>{poem.author}</i>
              <ul className="poetry-lines">
                <Lines />
              </ul>
            </>
          ) : null}
        </div>
        <div className="poetry-icons">
          <button onClick={handleHeart}>{toggle ? <AiFillHeart id="poetry-heart-icon-filled" /> : <AiOutlineHeart id="poetry-heart-icon" />}</button>
          <button>
            <Link to={`poetry`}>
              <GoBook id="poetry-book-icon" />
            </Link>
          </button>
          <button>
            <TbRefresh id="poetry-refresh-icon" onClick={handleRefresh} />
          </button>
        </div>
    </div>
  );
}

export default Poetry;
