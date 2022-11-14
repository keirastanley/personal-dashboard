import "./index.css"
import {useState} from "react";
import NavIcon from "../Nav Icon";

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
  const [toggle, setToggle] = useState(false);

  function GetNav() {
    if (toggle === true) {
      return pages.map((page, index) => (
        <NavItem page={page.page} href={page.href} key={index + 1}/>
      ));
    }
  }

  function NavItem({page, href}) {
    return (
      <li>
        <a href={href}>
          {page}
        </a>
      </li>
    );
  }

  function handleClick() {
    console.log(toggle)
    setToggle(!toggle);
  }


  return (
    <nav>
      <NavIcon handleClick={handleClick}/>
      <ul>
        <GetNav/>
      </ul>
    </nav>
  );
}

export default Nav;
