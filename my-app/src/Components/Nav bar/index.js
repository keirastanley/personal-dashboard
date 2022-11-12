import { React, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import './index.css'

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

  function GetNav({ toggle }) {
    if (toggle === true) {
      return pages.map((page, index) => (
        <NavItem page={page.page} href={page.href} key={index + 1} />
      ));
    }
  }

  function NavItem(props) {
    return (
      <li className="nav-item">
        <a className="nav-link" href={props.href}>
          {props.page}
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
    <nav>
      <NavIcon />
      <GetNav toggle={toggle} />
    </nav>
  );
}

export default Nav;
