import React from "react";
import "./index.css"

function Weather(){
    return <a class="weatherwidget-io" href="https://forecast7.com/en/51d51n0d13/london/" data-label_1="London" data-label_2="WEATHER" data-days="5" data-theme="pure" >London WEATHER<iframe id="weatherwidget-io-0" class="weatherwidget-io-frame" title="Weather Widget" scrolling="no" frameBorder="0" width="100%" src="https://weatherwidget.io/w/"></iframe></a>
}

export default Weather;