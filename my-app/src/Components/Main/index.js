import React from "react";
import Header from "../Header/index"
import Weather from "../Weather/index"
import Footer from "../Footer/index"

function Main(){
    return (
      <main>
          <Header/>
          <Weather/>
          <Footer/>
      </main>
      );
}

export default Main;