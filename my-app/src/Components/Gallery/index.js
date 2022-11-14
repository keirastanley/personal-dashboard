import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";
import "./index.css";

function Gallery() {
  const [toggle, setToggle] = useState(false);
  const [heart, setHeart] = useState(<AiOutlineHeart id="heart-icon" />);

  function handleClick() {
    setToggle(!toggle);
    if (toggle === true) {
      setHeart(<AiFillHeart id="heart-icon-filled"/>);
    } else {
      setHeart(<AiOutlineHeart id="heart-icon"/>);
    }
  }

  return (
    <div id="gallery-background">
      <img
        id="gallery-image"
        src="https://d1j88w5k23s1nr.cloudfront.net/eyJidWNrZXQiOiJhcnRzeS1tZWRpYS1hc3NldHMiLCJrZXkiOiJxUUwtdHN6RXVWa2RDdGtnUV91cWhRL25vcm1hbGl6ZWQuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4MDAsImhlaWdodCI6NTEzLCJmaXQiOiJpbnNpZGUifX19"
        alt="Claude Monet Waterloo Bridge, London, At Dusk"
      ></img>
      <div id="gallery-info-container">
        <p id="gallery-info">
          Waterloo Bridge, London, at Dusk, Claude Monet, Oil on canvas, 1904
        </p>
        <div id="icons-container">
          <button className="gallery-icon-button" onClick={handleClick}>
            {heart}
          </button>
          <button className="gallery-icon-button">
            <GrGallery id="gallery-icon"/>
          </button>
          <button className="gallery-icon-button">
            <TbRefresh id="refresh-icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
