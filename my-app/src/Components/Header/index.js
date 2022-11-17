import { useState } from "react";
import './index.css'

function Header() {

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
    setInterval(newTime, 1000);

    function newTime() {
        const d2 = new Date();
        const date2 = d2.toLocaleString('en-GB', options)
        setTime(date2);
    }

  return (
   <header>
      <h1>Home</h1>
      <p>{time}</p>
   </header>
  );
}

export default Header;
