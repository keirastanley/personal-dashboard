import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";
import images from "./gallery-images";
import "./index.css";

function Gallery() {
  const [toggle, setToggle] = useState(true);
  const [heart, setHeart] = useState(<AiOutlineHeart id="heart-icon" />);
  const [id, setId] = useState(0);
  
  function handleHeart() {
    if (toggle === true) {
      setHeart(<AiFillHeart id="heart-icon-filled"/>);
    } else {
      setHeart(<AiOutlineHeart id="heart-icon"/>);
    }
    setToggle(!toggle);
  }

  function handleRefresh() {
    const randomNumber = Math.floor(Math.random() * images.length)
    setId(randomNumber)
  }

  return (
    <div className="gallery-section">
      <img 
        src={images[id].src}
        alt={images[id].alt}>
        </img>
      <div className="gallery-info-container">
        <div className="gallery-info">
          <p>
            {images[id].title}, {images[id].artist}, {images[id].medium}, {images[id].year}
          </p>
        </div>
        <div className="icons-container">
          <button onClick={handleHeart}>
            {heart}
          </button>
          <button>
            <GrGallery id="gallery-icon"/>
          </button>
          <button onClick={handleRefresh}>
            <TbRefresh id="refresh-icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
