import { IoMenuOutline } from "react-icons/io5";

function NavIcon({handleClick}) {
    return (
      <button onClick={handleClick}>
        <IoMenuOutline size="3em" />
      </button>
    );
  }

export default NavIcon;