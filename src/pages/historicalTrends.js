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
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "../styles/HistoricalTrendsStyles.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BASE_URL = "http://localhost:8080";

const HistoricalTrends = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCities, setSelectedCities] = useState(["Karachi"]);
  const [data, setData] = useState([]);
  const [tempGraphType, setTempGraphType] = useState("line");
  const [aqiGraphType, setAqiGraphType] = useState("line");
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {

    const fetchData = async () => {
        if (!selectedCities.length) return;
    
        const cityQuery = selectedCities.length > 1 ? "all" : selectedCities[0];
        const start = startDate.toISOString().split("T")[0];
        const end = endDate.toISOString().split("T")[0];
    
        try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/fetch-data/${cityQuery}/${start}/${end}`);
          const result = await response.json();
    
          if (result.success) {
            setData(result.data);
          } else {
            console.error("Error fetching data:", result.message);
            setData([]);
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setData([]);
        } finally {
          setIsLoading(false);
        }
    };

    fetchData();
  }, [startDate, endDate, selectedCities]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow for larger graphs
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#d1d5db",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#ffffff",
        bodyColor: "#d1d5db",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid
        },
        ticks: {
          color: "#d1d5db",
          font: {
            size: 12,
          },
          callback: function (value, index, values) {
            const timestamp = data[index]?.PollutionTimestamp;
            return timestamp ? formatTimestamp(timestamp) : "";
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Subtle grid lines
        },
        ticks: {
          color: "#d1d5db",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const tempChartData = {
    labels: data.map((item) => item.PollutionTimestamp),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((item) => item.Temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 3,
        tension: 0.4, // Smooth curves
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const aqiChartData = {
    labels: data.map((item) => item.PollutionTimestamp),
    datasets: [
      {
        label: "AQI_US",
        data: data.map((item) => item.AQI_US),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 3,
        tension: 0.4, // Smooth curves
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const renderChart = (chartType, chartData) => {
    switch (chartType) {
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="trends-container">
      <CityAndDateSelector
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
      />

      {isLoading && <p className="loading-text">Loading data...</p>}

      {!isLoading && data.length > 0 ? (
        <div className="graphs-container">
          <div className="graph-section large-graph">
            <h3 className="graph-title">Temperature Trends</h3>
            <p className="graph-subtitle">{selectedCities.join(", ")}</p>
            <select
              className="graph-type-selector"
              value={tempGraphType}
              onChange={(e) => setTempGraphType(e.target.value)}
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
            <div className="chart-wrapper">
              {renderChart(tempGraphType, tempChartData)}
            </div>
          </div>

          <div className="graph-section large-graph">
            <h3 className="graph-title">Air Quality Index (AQI)</h3>
            <p className="graph-subtitle">{selectedCities.join(", ")}</p>
            <select
              className="graph-type-selector"
              value={aqiGraphType}
              onChange={(e) => setAqiGraphType(e.target.value)}
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
            <div className="chart-wrapper">
              {renderChart(aqiGraphType, aqiChartData)}
            </div>
          </div>
        </div>
      ) : (
        !isLoading && <p className="no-data-text">No data available for the selected range.</p>
      )}
    </div>
  );
};

export default HistoricalTrends;