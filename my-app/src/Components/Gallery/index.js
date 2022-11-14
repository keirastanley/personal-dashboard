import { AiOutlineHeart } from "react-icons/ai";
import { GrGallery } from "react-icons/gr"
import { TbRefresh } from "react-icons/tb"
import "./index.css"

function Gallery(){
    return <div id="gallery-background">
        <img 
            id="gallery-image" 
            src="https://d1j88w5k23s1nr.cloudfront.net/eyJidWNrZXQiOiJhcnRzeS1tZWRpYS1hc3NldHMiLCJrZXkiOiJxUUwtdHN6RXVWa2RDdGtnUV91cWhRL25vcm1hbGl6ZWQuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4MDAsImhlaWdodCI6NTEzLCJmaXQiOiJpbnNpZGUifX19" 
            alt="Claude Monet Waterloo Bridge, London, At Dusk">
        </img>
        <div id="gallery-info-container">
            <p 
                id="gallery-info">
                Waterloo Bridge, London, at Dusk, Claude Monet, Oil on canvas, 1904
            </p>
            <div id="icons-container">
                <AiOutlineHeart id="heart-icon"/>
                <GrGallery id="gallery-icon"/>
                <TbRefresh id="refresh-icon"/>
            </div>
        </div>
    </div>
}

export default Gallery;