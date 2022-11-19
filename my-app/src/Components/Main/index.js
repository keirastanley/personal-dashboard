import Weather from "../Weather/index"
import Gallery from "../Gallery/index"
import Poetry from "../Poetry/index"
import Goals from "../Goals/index"
import Ideas from "../Ideas/index"
import Favourites from "../Favourites/index"
import Tasks from "../Tasks/index"
import "./index.css"

function Main(){
    return (
      <main>
          <div className="content-container">
            <Weather/>
            <Poetry/>
            <Gallery/>
            <Goals/>
            <Ideas/>
            <Favourites/>
            <Tasks/>
        </div>
      </main>
      );
}

export default Main;