import Weather from "../Weather/index";
import Gallery from "../Gallery/index";
import Poetry from "../Poetry/index";
import Goals from "../Goals/index";
import Ideas from "../Ideas/index";
import Favourites from "../Favourites/index";
import Tasks from "../Tasks/index";
import {Link} from "react-router-dom";
import "./index.css";

function Main() {

  console.log(window.matchMedia("(max-width: 700px)"))

  if (window.matchMedia("(min-width: 800px)").matches) {
    return (
      <main className="content-container">
        <Weather />
        <div className="poetry-gallery-container">
          <Poetry className="poetry"/>
          <Gallery />
        </div>
        <div className="ideas-goals-container">
          <Ideas className="ideas"/>
          <Goals className="goals"/>
        </div>
        <div className="favourites-tasks-container">
        <Tasks className="tasks"/>
        <Favourites className="favourites"/>
        </div>

      </main>
    );
  } else {
    return (
      <main className="content-container">
        <div className="mobile-links-container">
          <div className="mobile-tasks-link"><Link to={`tasks`}>Things to do</Link></div>
          <div className="mobile-goals-link"><Link to={`goals`}>Goals</Link></div>
          <div className="mobile-favourites-link"><Link to={`favourites`}>Favourites</Link></div>
          <div className="mobile-ideas-link"><Link to={`ideas`}>Ideas</Link></div>
          <div className="mobile-poetry-link"><Link to={`poetry`}>Reading list</Link></div>
          <div className="mobile-gallery-link"><Link to={`gallery`}>Gallery</Link></div>
        </div>
        <div className="help-about-container">
          <div className="mobile-help-link"><Link to={`help`}>Help</Link></div>
          <div className="mobile-about-link"><Link to={`about`}>About</Link></div>
        </div>
        <Gallery />
        <Poetry/>
      </main>
    );
  }
}

export default Main;
