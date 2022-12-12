import { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="header-bar">
        <h1><Link to={`/personal-dashboard`}>Home</Link></h1>
        <p>{time}</p>
      </div>
   </header>
  );
}

export default Header;
