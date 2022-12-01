import "./index.css";
import { useState } from "react";
import GalleryImages from "./GalleryImage";

export default function GalleryPage(){

  function handleExpand() {
    // const randomNumber = Math.floor(Math.random() * images.length)
  }

  return (
    <div className="galleryPage-container">
        <GalleryImages handleExpand={handleExpand}/>
    </div>
  );
}