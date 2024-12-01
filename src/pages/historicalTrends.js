import React, { useState, useEffect } from "react";
import CityAndDateSelector from "../components/selectors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "../styles/HistoricalTrendsStyles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BASE_URL = "http://localhost:8080";

const HistoricalTrends = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chartType, setChartType] = useState('line');


  const cities = [
    "Karachi",
    "Abbottabad",
    "Bahawalpur",
    "Charsadda",
    "Faisalabad",
    "Haripur",
    "Islamabad",
    "Lahore",
    "Lodhran",
    "Mananwala",
    "Mangla",
    "MohmandAgency",
    "Multan",
    "Peshawar",
    "Rawalpindi",
    "Rojhan",
    "Sialkot",
    "Sukkur",
  ];

  

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;

      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL}/fetch-data/${selectedCity}/${start.toISOString()}/${end.toISOString()}`
        );
        const result = await response.json();

        if (result.success) {
          const sortedData = result.data.sort(
            (a, b) => new Date(a.PollutionTimestamp) - new Date(b.PollutionTimestamp)
          );
          setData(sortedData);
          if (sortedData.length > 0) {
            setLatestData(sortedData[sortedData.length - 1]);
          }
        } else {
          console.error("Error fetching data:", result.message);
          setData([]);
          setLatestData(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]);
        setLatestData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, selectedCity]);

  const renderChart = (label, dataKey, borderColor) => (
    <div className="graph-section">
      <h3 className="graph-title">{label}</h3>
      <div className="chart-wrapper">
        {chartType === 'line' ? (
          <Line
            data={{
              labels: data.map((item) => item.PollutionTimestamp),
              datasets: [
                {
                  label: label,
                  data: data.map((item) => item[dataKey]),
                  borderColor: borderColor,
                  backgroundColor: "rgba(0, 0, 0, 0)", // No shaded area
                  tension: 0.4, // For smooth curves
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: "category",
                  title: {
                    display: true,
                    text: "Timestamp",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: label,
                  },
                },
              },
            }}
          />
        ) : (
          <Bar
            data={{
              labels: data.map((item) => item.PollutionTimestamp),
              datasets: [
                {
                  label: label,
                  data: data.map((item) => item[dataKey]),
                  borderColor: borderColor,
                  backgroundColor: borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: "category",
                  title: {
                    display: true,
                    text: "Timestamp",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: label,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
  
  return (
    <div className="page-container">
      
      <div className="tabs-container">
        {cities.map((city) => (
          <div
            key={city}
            className={`tab ${city === selectedCity ? "active" : ""}`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </div>
        ))}
      </div>
      
      <div className="content-container">
        <h2 className="city-aqi-title">{selectedCity} Air Quality Index (AQI)</h2>

        {latestData ? (
          <div className="latest-data-container">
            <div className="aqi-and-info-wrapper">
              <div className="aqi-wrapper">
                <div className={`aqi aqi-bg-${latestData.AQI_US > 150 ? "red" : "green"}`}>
                  {/* <div className="aqi-face">
                    <img
                      src={`/path/to/icon-${latestData.AQI_US > 150 ? "bad" : "good"}.svg`}
                      alt={latestData.AQI_US > 150 ? "Very Unhealthy" : "Good"}
                    />
                  </div> */}
                  <div className="info">
                    <div className="info-aqi">
                      <span className="number">{latestData.AQI_US}</span>
                      <span className="status">
                        {latestData.AQI_US > 150 ? "  Very Unhealthy" : "  Good"}
                      </span>
                    </div>
                    <div className="info-legend">
                      <p className="text-small unit">US AQI</p>
                      <p className="pm-value">
                        <span className="uppercase">PM2.5 | {latestData.PM2_5}</span> µg/m³
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="additional-info">
                <p style={{color:'#000'}}><strong>Temperature:</strong> {latestData.Temperature}°C</p>
                <p style={{color:'#000'}}><strong>Humidity:</strong> {latestData.Humidity}%</p>
                <p style={{color:'#000'}}><strong>Pressure:</strong> {latestData.Pressure} hPa</p>
                <p style={{color:'#000'}}><strong>Wind Speed:</strong> {latestData.WindSpeed} km/h</p>
                <p style={{color:'#000'}}><strong>Wind Direction:</strong> {latestData.WindDirection}°</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="no-data-text">No latest data available for {selectedCity}</p>
        )}

        <CityAndDateSelector
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        
        {isLoading ? (
  <p className="loading-text">Loading data...</p>
) : data.length > 0 ? (
  <>
    <div className="latest-data">
    </div>
    <div className="chart-type-selector">
      <label htmlFor="chartType">Select Chart Type: </label>
      <select id="chartType" value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
    </div>
    <div className="graphs-container">
      {renderChart("Temperature (°C)", "Temperature", "rgba(255, 99, 132, 1)")}
      {renderChart("US_AQI", "AQI_US", "rgba(54, 162, 235, 1)")}
      {renderChart("Humidity (%)", "Humidity", "rgba(75, 192, 192, 1)")}
      {renderChart("Pressure (hPa)", "Pressure", "rgba(153, 102, 255, 1)")}
    </div>
  </>
) : (
  <p className="no-data-text">No data available for {selectedCity}</p>
)}

      </div>
    </div>
  );
};

export default HistoricalTrends;
