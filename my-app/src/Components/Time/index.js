import {React, useState} from "react";

function Time(){
    const d = new Date();
    const [time, setTime] = useState(d.toLocaleTimeString())
    
    setInterval(newTime, 1000)
    
    function newTime(){
        let newD = new Date()
        setTime(newD)
    }
    return {time: time};
}

//export default Time;
