import "./index.css"
import {useState} from "react";
import NavIcon from "./Nav Icon";
import {Link} from "react-router-dom"

const pages = [
  { page: "Home", link: "/personal-dashboard" },
  { page: "Things to Do", link: "tasks" },
  { page: "Goals", link: "goals" },
  { page: "Favourites", link: "favourites" },
  { page: "Idea generator", link: "ideas" },
  { page: "Reading list", link: "poetry" },
  { page: "Gallery", link: "gallery" },
  { page: "About", link: "about" },
  { page: "Help", link: "help" },
];

function Nav() {
  const [toggle, setToggle] = useState(false);

  function GetNav() {
    if (toggle === true) {
      return pages.map((page, index) => (
        <NavItem page={page.page} link={page.link} key={index + 1}/>
      ));
    }
  }

  function NavItem({page, link}) {
    return (
      <li>
        <Link to={link}>{page}</Link>
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
