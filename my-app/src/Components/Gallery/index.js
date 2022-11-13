import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GrGallery } from "react-icons/gr"
import { TbRefresh } from "react-icons/tb"
import "./index.css"

function Gallery(){
    return <div id="gallery-background">
        <img src="https://d1j88w5k23s1nr.cloudfront.net/eyJidWNrZXQiOiJhcnRzeS1tZWRpYS1hc3NldHMiLCJrZXkiOiJxUUwtdHN6RXVWa2RDdGtnUV91cWhRL25vcm1hbGl6ZWQuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4MDAsImhlaWdodCI6NTEzLCJmaXQiOiJpbnNpZGUifX19" alt="Claude Monet Waterloo Bridge, London, At Dusk"></img>
        <p id="gallery-info">Waterloo Bridge, London, at Dusk, Claude Monet, Oil on canvas, 1904</p>
        <AiOutlineHeart/>
        <GrGallery/>
        <TbRefresh/>
    </div>
}

export default Gallery;