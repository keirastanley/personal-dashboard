/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "./App.css";
import Weather from "./components/Weather";
import Poetry from "./components/Poetry/PoetryWidget";
import Gallery from "./components/Gallery/GalleryWidget";
import Ideas from "./components/Ideas";
import Tasks from "./components/Tasks";
import Goals from "./components/Goals";
import Favourites from "./components/Favourites";
import Header from "./components/Header/Header";

const Footer = () => (
  <div
    css={css`
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
    `}
  >
    Footer
  </div>
);

function App() {
  return (
    <main
      css={css`
        height: 100vh;
        width: 100%;
      `}
    >
      <Header />
      <div
        css={css`
          margin-bottom: 20px;
          display: grid;
          padding: 30px;
          height: 100%;
          grid-template-columns: 1.5fr 3fr 1.4fr;
          grid-template-rows:
            calc(25% - 30px) calc(5% - 30px) calc(13% - 30px) calc(18% - 30px)
            calc(39% - 30px);
          gap: 10px;
        `}
      >
        {" "}
        <div
          css={css`
            grid-column: 1;
            grid-row-start: 1;
            grid-row-end: span 2;
            border: 1px solid green;
          `}
        >
          <Weather />
        </div>
        <div
          css={css`
            grid-column: 2;
            grid-row: 1;
          `}
        >
          <Poetry />
        </div>
        <div
          css={css`
            grid-column: 3;
            grid-row-start: 1;
            grid-row-end: span 3;
          `}
        >
          <Gallery />
        </div>
        <div
          css={css`
            grid-column: 1;
            grid-row-start: 3;
            grid-row-end: 5;
          `}
        >
          <Ideas />
        </div>
        <div
          css={css`
            grid-column-start: 1;
            grid-column-end: span 2;
            grid-row: 5;
          `}
        >
          <Tasks />
        </div>
        <div
          css={css`
            grid-column: 2;
            grid-row-start: 2;
            grid-row-end: 5;
          `}
        >
          <Goals />
        </div>
        <div
          css={css`
            grid-column: 3;
            grid-row-start: 4;
            grid-row-end: 6;
          `}
        >
          <Favourites />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
