import React, { useEffect } from "react";
import Chart from "chart.js/dist/Chart.bundle";
import moment from "moment";
import "./style.css";

export default function WeatherForecastGraph(props) {
  const { fiveDayForecast } = props.fiveDayForecastData;
  let tempMin = "";
  let tempMax = "";
  const tempData = [];
  const timeData = [];
  const graphData = [];

  function kelvinToFahrenheit(kelvin) {
    let fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
    return Math.round(fahrenheit);
  }

  if (Array.isArray(fiveDayForecast)) {
    tempMin = fiveDayForecast[0].main.temp;
    tempMax = fiveDayForecast[0].main.temp;

    fiveDayForecast.map((hour, index) => {
      let temp = hour.main.temp;
      //set tempMin
      if (temp < tempMin) {
        tempMin = temp;
      }
      //set tempMax
      if (temp > tempMax) {
        tempMax = temp;
      }

      tempData.push(kelvinToFahrenheit(temp));
      graphData.push({ t: moment.unix(hour.dt), y: kelvinToFahrenheit(temp) });
    });

    tempMin = kelvinToFahrenheit(tempMin);
    tempMax = kelvinToFahrenheit(tempMax);
    console.log("tempMin: ", tempMin, ", tempMax: ", tempMax);
    console.log("graphData: ", graphData);

    const startDate = moment.unix(fiveDayForecast[0].dt);
    const endDate = moment.unix(fiveDayForecast[fiveDayForecast.length - 1].dt);

    const ctx = "myChart";
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Temperature Forecast",
            data: graphData,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "hour",
              },
              ticks: {
                min: startDate,
                max: endDate,
                maxTicksLimit: 30,
              },
            },
          ],
        },
      },
    });
  }

  return (
    <div className="chartContainerWrapper" style={{ maxWidth: '375px', maxHeight: "400px", overflowX: 'scroll'}}>
          <div className="chartContainer" style={{position: 'relative', width:'1000px'}}
    >
      <canvas id="myChart"  style={{backgroundColor: "white"}}>
        {console.log(document.getElementById('myChart'))}
      </canvas>
    </div>
    </div>

  );
}
