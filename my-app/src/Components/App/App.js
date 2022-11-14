import './App.css';
import { React, useState } from "react";
import Header from "../Header/index"
import Main from '../Main';
import Footer from "../Footer/index"
import Nav from '../Nav Bar';


function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div id="app">
      <Header toggle={toggle} setToggle={setToggle}/>
      <Nav toggle={toggle}/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App;