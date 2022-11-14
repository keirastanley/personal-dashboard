import Weather from "../Weather/index"
import Gallery from "../Gallery/index"
import "./index.css"

function Main({toggle}){
    return (
      <main>
        <Weather/>
        <Gallery/>
      </main>
      );
}

export default Main;