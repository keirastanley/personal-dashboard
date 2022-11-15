import Weather from "../Weather/index"
import Gallery from "../Gallery/index"
import Poetry from "../Poetry/index"
import Goals from "../Goals/index"
import "./index.css"

function Main(){
    return (
      <main>
          <div className="content-container">
            <Weather/>
            <Poetry/>
            <Gallery/>
            <Goals/>
        </div>
      </main>
      );
}

export default Main;