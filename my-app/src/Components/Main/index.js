import Weather from "../Weather/index";
import Gallery from "../Gallery/index";
import Poetry from "../Poetry/index";
import Goals from "../Goals/index";
import Ideas from "../Ideas/index";
import Favourites from "../Favourites/index";
import Tasks from "../Tasks/index";
import "./index.css";

function Main() {
  if (window.matchMedia("(min-width: 800px)").matches) {
    return (
      // <main>
      <main className="content-container">
        <Weather />
        <Poetry />
        <Gallery />
        <Goals />
        <Ideas />
        <Favourites />
        <Tasks />
      </main>
      // </main>
    );
  } else {
    return (
      // <main>
      <main className="content-container">
        <div className="mobile-links-container">
          <div className="mobile-tasks-link">Things to do</div>
          <div className="mobile-goals-link">Goals</div>
          <div className="mobile-favourites-link">Favourites</div>
          <div className="mobile-ideas-link">Idea generator</div>
          <div className="mobile-poetry-link">Reading list</div>
          <div className="mobile-gallery-link">Gallery</div>
        </div>
        <div className="help-about-container">
          <div className="mobile-help-link">Help</div>
          <div className="mobile-about-link">About</div>
        </div>
        {/* <Weather/> */}
        <Gallery />
        <Poetry/>
        {/* <Poetry/>
        <Gallery/>
        <Goals/>
        <Ideas/>
        <Favourites/>
        <Tasks/> */}
      </main>
      // </main>
    );
  }
}

export default Main;
