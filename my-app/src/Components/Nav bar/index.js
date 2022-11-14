import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import "./index.css"

const pages = [
  { page: "Home", href: "#" },
  { page: "Things to Do", href: "#" },
  { page: "Goals", href: "#" },
  { page: "Favourites", href: "#" },
  { page: "Idea generator", href: "#" },
  { page: "Reading list", href: "#" },
  { page: "Gallery", href: "#" },
  { page: "About", href: "#" },
  { page: "Help", href: "#" },
];

function Nav() {
  const [toggle, SetToggle] = useState(false);

  function GetNav({toggle}) {
    if (toggle === true) {
      return pages.map((page, index) => (
        <NavItem page={page.page} href={page.href} key={index + 1}/>
      ));
    }
  }

  function NavItem({page, href}) {
    return (
      <li className="nav-item">
        <a className="nav-link" href={href}>
          {page}
        </a>
      </li>
    );
  }

  function handleClick() {
    SetToggle(!toggle);
  }

  function NavIcon() {
    return (
      <button onClick={handleClick}>
        <IoMenuOutline size="3em" />
      </button>
    );
  }

  return (
    <nav className="navbar">
      <NavIcon />
      <div className = "navdropdown">
        <GetNav toggle={toggle} />
      </div>
    </nav>
  );
}

export default Nav;
