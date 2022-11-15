import Weather from "../Weather/index"
import Gallery from "../Gallery/index"
import Poetry from "../Poetry/index"
import "./index.css"

function Main(){
    return (
      <main>
        <Weather/>
        <Poetry/>
        <Gallery/>
      </main>
      );
}

export default Main;