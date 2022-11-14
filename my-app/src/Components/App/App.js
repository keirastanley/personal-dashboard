import './App.css';
import React from "react";
import Header from "../Header/index"
import Nav from '../Nav Bar';
import Main from '../Main';
import Footer from "../Footer/index"

function App() {

  return (
    <div className="page-container">
      <Header />
      <Nav/>
      <Main />
      <Footer/>
    </div>
  )
}

export default App;