import { HiOutlineArrowsExpand } from "react-icons/hi";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi"
// import images from "../../../Components/Gallery/gallery-images"
import GallerySearch from "../GallerySearch";
import { useState, useEffect } from "react";

export default function GalleryImages({ handleExpand }) {

  const [number, setNumber] = useState(6)
  const [images, setImages] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState(0)
  const [allImages, setAllImages] = useState([])

  async function getImages(num) {
    const imagesArr = []
    for (let i = num - 6; i < num; i++) {
      const response = await fetch(`https://personal-dashboard.onrender.com/api/art/${i + 1}`)
      const data = await response.json()
      if (data.payload.length > 0) {
        imagesArr.push(data.payload[0])
      }
      console.log(imagesArr)
    }
    setImages(imagesArr)
    const response = await fetch(`https://personal-dashboard.onrender.com/api/art/`)
    const data = await response.json()
    setAllImages(data.payload)
  }

  useEffect(() => {
    getImages(number)
  }, [])

  function loadMoreImagesRight() {
    getImages(number + 6)
    setNumber(number + 6)
  }

  function loadMoreImagesLeft() {
    if (number - 6 <= 0 === false) {
      getImages(number - 6)
      setNumber(number - 6)
    }
  }

  useEffect(() => {
    console.log("HELLLOOOOO", images)
  }, [images])

  function handleChange(event) {
    let search = toLower(event.target.value).split(" ");
    setSearchTerm(search.filter(el => /^[A-Za-z]+$/.test(el)))
  }

  function handleClick() {
    let titleIndexes = []
    let titleResults = []
    let artistIndexes = []
    let artistResults = []
    let mediumIndexes = []
    let mediumResults = []
    let matchImage;
    let matches = 0;
    let newImages = [...allImages]
    for (let i = 0; i < allImages.length; i++) {
      const titleArr = allImages[i].title.split(" ").map(el => onlyAlph(toLower(el)))
      const artistArr = allImages[i].artist.split(" ").map(el => onlyAlph(toLower(el)))
      const mediumArr = allImages[i].medium.split(" ").map(el => onlyAlph(toLower(el)))
      if ((titleArr.map(el => searchTerm.some(el2 => el2 === el)).includes(true))) {
        matchImage = newImages[i];
        console.log(matchImage)
        titleIndexes = searchTerm.map(el => titleArr.indexOf(el)).filter(el2 => el2 >= 0)
        titleResults = newImages[i].title.split(" ").filter((el, ind) => titleIndexes.includes(ind))
        let newTitle = highlightMatch(newImages[i].title, titleIndexes, titleResults)
        matchImage = { ...matchImage, title: newTitle }
        console.log(matchImage)
        newImages = [...newImages.slice(0, i), matchImage, ...newImages.slice(i + 1)]
        matches++;
      }
      if ((artistArr.map(el => searchTerm.some(el2 => el2 === el)).includes(true))) {
        matchImage = newImages[i];
        artistIndexes = searchTerm.map(el => artistArr.indexOf(el)).filter(el2 => el2 >= 0)
        artistResults = newImages[i].artist.split(" ").filter((el, ind) => artistIndexes.includes(ind))
        let newArtist = highlightMatch(newImages[i].artist, artistIndexes, artistResults)
        matchImage = { ...matchImage, artist: newArtist }
        newImages = [...newImages.slice(0, i), matchImage, ...newImages.slice(i + 1)]
        matches++;
      }
      if ((mediumArr.map(el => searchTerm.some(el2 => el2 === el)).includes(true))) {
        matchImage = newImages[i];
        mediumIndexes = searchTerm.map(el => mediumArr.indexOf(el)).filter(el2 => el2 >= 0)
        mediumResults = newImages[i].medium.split(" ").filter((el, ind) => mediumIndexes.includes(ind))
        let newMedium = highlightMatch(newImages[i].medium, mediumIndexes, mediumResults)
        matchImage = { ...matchImage, medium: newMedium }
        newImages = [...newImages.slice(0, i), matchImage, ...newImages.slice(i + 1)]
        matches++;
      }
    }
    const imagesArr = []
    for (let i = 0; i < newImages.length; i++) {
      console.log(typeof (newImages[i].title))
      if (typeof (newImages[i].artist) === "object") {
        imagesArr.push(newImages[i])
      }
      if (typeof (newImages[i].title) === "object") {
        imagesArr.push(newImages[i])
      }
      if (typeof (newImages[i].medium) === "object") {
        imagesArr.push(newImages[i])
      }
    }
    console.log("hi", imagesArr)
    setImages(imagesArr)
    setMatches(matches);
  }

  function highlightMatch(text, indexes, results) {
    return <span> {text.split(" ").slice(0, indexes[0]).join(" ")} <span className="highlighted">{results.join(" ")} </span> {text.split(" ").slice(indexes[indexes.length - 1] + 1).join(" ")} </span>
  }

  // function reorderMatches(poems){
  //     let matchPoems = poems.filter(el => typeof(el.title) === "object" || typeof(el.author) === "object" || el.lines.some(el2 => typeof(el2) === "object"))
  //     let nonMatchPoems = poems.filter(el => typeof(el.title) === "string" && typeof(el.author) === "string" && el.lines.every(el2 => typeof(el2) === "string"))
  //     return [...matchPoems, ...nonMatchPoems]
  // }

  function toLower(text) {
    return text.toLowerCase()
  }

  function onlyAlph(text) {
    return text.replace(/[^\w\s']|_/g, "").replace(/[.,#!$%^&*;:{}=\-_'`~()]/g, "").replace(/\s+/g, " ")
  }

  return <div className="galleryPage-results">
    {/* <GallerySearch handleClick={handleClick} handleChange={handleChange} /> */}
    <div className="galleryPage-arrows">
      <BiLeftArrow className="galleryPage-next" onClick={loadMoreImagesLeft} />
      <BiRightArrow className="galleryPage-next" onClick={loadMoreImagesRight} />
    </div>
    <div className="galleryPage-cards">
      {images.length > 0 ? images.map(image =>
        <div className="galleryPage-card">
          <img src={image.src} alt={image.alt}></img>
          <div className="galleryPage-info-container">
            <div className="galleryPage-info">
              <p>
                {image.title}, {image.artist}, {image.medium}, {" "}
                {image.year}
              </p>
            </div>
            <button onClick={handleExpand}>
              <HiOutlineArrowsExpand id="expand-icon" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
</div>
}
