import React from "react";
import Header from "../Header/index"
import Weather from "../Weather/index"
import Gallery from "../Gallery/index"
import Footer from "../Footer/index"

function Main(){
    return (
      <main>
          <Header/>
          <Weather/>
          <Gallery/>
          <Footer/>
      </main>
      );
}

export default Main;