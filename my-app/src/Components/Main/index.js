import Weather from "../Weather/index"
import Gallery from "../Gallery/index"
import "./index.css"

function Main(){
    return (
      <main>
        <div className = "container-top">
          <Weather/>
          <Gallery/>
        </div>
      </main>
      );
}

export default Main;