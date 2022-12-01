import { HiOutlineArrowsExpand } from "react-icons/hi";
import images from "../../../Components/Gallery/gallery-images"

export default function GalleryImages({ handleExpand }) {
     return images.map(image => 
      <div className="galleryPage-card">
        <img src={image.src} alt={image.alt}></img>
        <div className="galleryPage-info-container">
          <div className="galleryPage-info">
            <p>
              {image.title}, {image.artist}, {image.medium},{" "}
              {image.year}
            </p>
          </div>
          <button onClick={handleExpand}>
            <HiOutlineArrowsExpand id="expand-icon" />
          </button>
        </div>
      </div>
    );
}
