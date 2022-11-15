import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";
import "./index.css";

function Gallery() {
  const [toggle, setToggle] = useState(true);
  const [heart, setHeart] = useState(<AiOutlineHeart id="heart-icon" />);

  function handleClick() {
    if (toggle === true) {
      setHeart(<AiFillHeart id="heart-icon-filled"/>);
    } else {
      setHeart(<AiOutlineHeart id="heart-icon"/>);
    }
    setToggle(!toggle);
  }

  return (
    <div className="gallery-section">
      <img 
        src="https://d1j88w5k23s1nr.cloudfront.net/eyJidWNrZXQiOiJhcnRzeS1tZWRpYS1hc3NldHMiLCJrZXkiOiJxUUwtdHN6RXVWa2RDdGtnUV91cWhRL25vcm1hbGl6ZWQuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4MDAsImhlaWdodCI6NTEzLCJmaXQiOiJpbnNpZGUifX19"
        alt="Claude Monet Waterloo Bridge, London, At Dusk">
        </img>
      <div className="gallery-info-container">
        <div className="gallery-info">
          <p>
            Waterloo Bridge, London, at Dusk,<br></br> Claude Monet, Oil on canvas, 1904
          </p>
        </div>
        <div className="icons-container">
          <button onClick={handleClick}>
            {heart}
          </button>
          <button>
            <GrGallery id="gallery-icon"/>
          </button>
          <button>
            <TbRefresh id="refresh-icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
