import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";
import { Link } from "react-router-dom";
import images from "./gallery-images";
import "./index.css";

function Gallery() {
  const [toggle, setToggle] = useState(true);
  const [heart, setHeart] = useState(<AiOutlineHeart id="heart-icon" />);
  const [id, setId] = useState(1);
  const [image, setImage] = useState([])
  
  function handleHeart() {
    if (toggle === true) {
      setHeart(<AiFillHeart id="heart-icon-filled"/>);
    } else {
      setHeart(<AiOutlineHeart id="heart-icon"/>);
    }
    setToggle(!toggle);
  }

  function handleRefresh() {
    const randomNumber = Math.floor(Math.random() * 100)
    setId(randomNumber)
  }

  async function getImage(){
    const response = await fetch(`https://personal-dashboard.onrender.com/api/art/${id}`)
    const data = await response.json()
    setImage(data.payload[0])
  }

  useEffect(() => {
    getImage()
  }, [id])

  return (
    <div className="gallery-section">
      {image ? <><img 
        src={image.src}
        alt={image.alt}>
        </img> 
      <div className="gallery-info-container">
          <p>
            {image.title}, {image.artist}, {image.medium}, {image.year}
          </p> </div></>: null}
      <div className="gallery-info-container">
        <div className="icons-container">
          <button onClick={handleHeart}>
            {heart}
          </button>
          <button>
            <Link to={`gallery`}>
              <GrGallery id="gallery-icon"/>
            </Link>
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
