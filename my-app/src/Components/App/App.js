import './App.css';
import React from "react";
import Header from "../Header/index"
import Nav from '../Nav Bar';
import Main from '../Main';
import Footer from "../Footer/index"

function App() {

  if (window.matchMedia("(min-width: 800px)").matches) {
    return (
      <div className="page-container">
        <Header />
        <Nav/>
        <Main />
        <Footer/>
      </div>
    )
    }
  else {
    return (
      <div className="page-container">
        <Header />
        <Main />
        <Footer/>
      </div>
    )
  }
      
}

export default App;