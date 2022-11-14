import { useState } from "react";
import NavIcon from "../Nav Icon/index"
import './index.css'

function Header({toggle, setToggle}) {
  
    const d = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
    const date = d.toLocaleString('en-GB', options)
    const [time, setTime] = useState(date);
    setInterval(newTime, 60000);

    function newTime() {
        const d2 = new Date();
        const date2 = d2.toLocaleString('en-GB', options)
        setTime(date2);
    }

    function handleClick() {
      console.log(toggle)
      setToggle(!toggle);
    }

  return (
    <header>
      <NavIcon handleClick={handleClick}/>
      <h1>Home</h1>
      <p>{time}</p>
    </header>
  );
}

export default Header;
