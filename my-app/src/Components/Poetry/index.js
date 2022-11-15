import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { TbRefresh } from "react-icons/tb";
import "./index.css";

function Poetry() {
  const [toggle, setToggle] = useState(false);
  const [heart, setHeart] = useState(<AiOutlineHeart id="heart-icon" />);

  function handleClick() {
    setToggle(!toggle);
    if (toggle === true) {
      setHeart(<AiFillHeart id="poetry-heart-icon-filled" />);
    } else {
      setHeart(<AiOutlineHeart id="poetry-heart-icon" />);
    }
  }

  return (
    <div className="poetry-container">
        <div className="poetry-info">
        <div className="poetry-text">
            <p>
            Ye lovers of the picturesque, away and see
            <br></br>
            Beautiful Balmoral, near by
            the River Dee;
            <br></br>
            There ye will see the deer browsing on the heathery
            hills
            <br></br>
            While adown their sides run clear sparkling rills.
            <br></br>
            <i>From Beautiful Balmoral by William Topaz McGonagall</i>
            </p>
      </div>
      <div className="poetry-icons">
        <button onClick={handleClick}>{heart}</button>
        <button>
          <GrGallery id="poetry-gallery-icon" />
        </button>
        <button>
          <TbRefresh id="poetry-refresh-icon" />
        </button>
      </div>
        </div>
    </div>
  );
}

export default Poetry;
