import "./index.css";

function Weather() {
  return (
    <div className="weather-container">
      <a
        className="weatherwidget-io"
        href="https://forecast7.com/en/51d51n0d13/london/"
        data-label_1="London"
        data-label_2="WEATHER"
        data-days="5"
        data-theme="pure"
      >
        If weather widget does not appear after a while, try refreshing the page.
        <iframe
          id="weatherwidget-io-0"
          className="weatherwidget-io-frame"
          title="Weather Widget"
          scrolling="no"
          frameBorder="0"
          width="100%"
          src="https://weatherwidget.io/w/"
        ></iframe>
      </a>
    </div>
  );
}

export default Weather;
