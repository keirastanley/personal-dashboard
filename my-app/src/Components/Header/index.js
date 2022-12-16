import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css'

function Header() {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const [time, setTime] = useState(new Date().toLocaleString('en-GB', options));

    useEffect(() => {
      let timer = setInterval(() => setTime(new Date().toLocaleString('en-GB', options)), 1000);

      return function cleanup(){
        clearInterval(timer)
      }
    })

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
