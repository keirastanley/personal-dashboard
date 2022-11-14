import { IoMenuOutline } from "react-icons/io5";
import "./index.css"

function NavIcon({handleClick}) {
    return (
      <button id="nav-button" onClick={handleClick}>
        <IoMenuOutline size="3em" />
      </button>
    );
  }

export default NavIcon;