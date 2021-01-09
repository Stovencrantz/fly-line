import React, { useEffect } from "react";
import Chart from "chart.js";

export default function WeatherForecastGraph(props) {
    
    const {fiveDayForecast} = props.fiveDayForecastData;
    let tempMin = "";
    let tempMax = "";
    const tempData = [];
    const timeData = [];

    function kelvinToFahrenheit(kelvin) {
        let fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
        return Math.round(fahrenheit);
      }

    if(Array.isArray(fiveDayForecast)) {
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

        let unix_timestamp = hour.dt;
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        // console.log(formattedTime);

        timeData.push(formattedTime)


    })
    tempMin = kelvinToFahrenheit(tempMin);
    tempMax = kelvinToFahrenheit(tempMax);
    console.log("tempMin: ", tempMin, ", tempMax: ", tempMax);
    console.log("tempData: ", tempData)

    const ctx = 'myChart';
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: timeData,
        datasets: [
          {
            label: "# of Votes",
            data: tempData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
              //   beginAtZero: true,
                min: tempMin-5,
                max: tempMax+5
              },
            },
          ],
        },
      },
    });
    }




  return <canvas id="myChart" style={{backgroundColor: "white"}}></canvas>;
}
