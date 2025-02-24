/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", link: "/" },
  { name: "Things to Do", link: "tasks" },
  { name: "Goals", link: "goals" },
  { name: "Favourites", link: "favourites" },
  { name: "Idea generator", link: "ideas" },
  { name: "Reading list", link: "poetry" },
  { name: "Gallery", link: "gallery" },
  { name: "About", link: "about" },
  { name: "Help", link: "help" },
];

const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
} as const;

function Nav() {
  const [toggle, setToggle] = useState(false);
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

  return (
    <nav>
      <div
        css={css`
          display: flex;
          height: 50px;
          button {
            background-color: transparent;
            border: none;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            /* height: 35px; */
            background-color: var(--header);
            h1 {
              font-size: 20px;
              text-align: center;
              padding: 20px;
            }
            a {
              color: black;
              text-decoration: none;
            }
            p {
              padding: 20px;
            }
          `}
        >
          <h1>
            <Link to="/">Home</Link>
          </h1>
          <p
            css={css`
              display: flex;
              gap: 15px;
            `}
          >
            {time.split(" at ").map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
