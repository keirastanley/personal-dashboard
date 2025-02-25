/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Heading1 } from "../shared";

// const pages = [
//   { name: "Home", link: "/" },
//   { name: "Things to Do", link: "tasks" },
//   { name: "Goals", link: "goals" },
//   { name: "Favourites", link: "favourites" },
//   { name: "Idea generator", link: "ideas" },
//   { name: "Reading list", link: "poetry" },
//   { name: "Gallery", link: "gallery" },
//   { name: "About", link: "about" },
//   { name: "Help", link: "help" },
// ];

const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
} as const;

function Header() {
  // const [toggle, setToggle] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleString("en-GB", options));

  useEffect(() => {
    let timer = setInterval(
      () => setTime(new Date().toLocaleString("en-GB", options)),
      1000
    );

    return function cleanup() {
      clearInterval(timer);
    };
  });

  // function GetNav() {
  //   if (toggle === true) {
  //     return pages.map((page, index) => (
  //       <NavItem page={page.name} link={page.link} key={index + 1} />
  //     ));
  //   }
  // }

  return (
    <nav>
      <div
        css={css`
          display: flex;
          height: 5vh;
          button {
            background-color: transparent;
            border: none;
            /* padding: 20px; */
          }
        `}
      >
        {/* <button onClick={() => setToggle(!toggle)}>
          <IoMenuOutline size="3em" />
        </button> */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            /* height: 35px; */
            background-color: var(--header);
            a {
              color: black;
              text-decoration: none;
            }
            p {
              padding: 20px;
            }
          `}
        >
          <Heading1
            css={css`
              font-size: 20px;
              padding: 5px;
            `}
          >
            <Link to="/">Home</Link>
          </Heading1>
          <p
            css={css`
              display: flex;
              gap: 15px;
            `}
          >
            {time.split("at").map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        </div>
      </div>
      {/* {toggle && (
        <div
          css={css`
            font-size: 20px;
            height: 100%;
            ul {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              margin: 0px;
              padding: 20px 20px 20px 65px;
              height: 100%;
            }
            li {
              list-style: none;
              padding: 0px 0px 20px 0px;
            }
            a {
              color: black;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
          `}
        >
          <ul>
            {pages.map(({ name, link }) => (
              <li key={link}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </nav>
  );
}

export default Header;
