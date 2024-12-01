import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/SelectorStyles.css";

const allCities = [
  "Abbottabad", "bahawalpur", "Charsadda", "Faislabad", "Haripur",
  "Islamabad", "Karachi", "Lahore", "Lodhran", "Mananwala", "mangla",
  "MohmandAgency", "Multan", "Peshawar", "Rawalpindi", "Rojhan",
  "Sialkot", "Sukkur"
];

const CityAndDateSelector = ({ startDate, setStartDate, endDate, setEndDate, selectedCities, setSelectedCities }) => {
  return (
    <div className="revamped-container">
      {/* <h2 className="revamped-title">Analyze Air Quality Trends</h2> */}

      {/* City Selector */}
      {/* <div className="city-section">
        <label className="revamped-label">Select Cities</label>
        <select
          multiple
          className="revamped-dropdown"
          value={selectedCities}
          onChange={(e) =>
            setSelectedCities([...e.target.selectedOptions].map((o) => o.value))
          }
        >
          {allCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div> */}

      {/* Date Range Selector */}
      <div className="date-section">
        <div 
        style={{ marginLeft: "25vh" }}
        className="date-picker-container">
          <label 
          className="revamped-label"><strong>Start Date</strong></label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="revamped-date-picker"
          />
        </div>
        <div className="date-picker-container">
          <label className="revamped-label"><strong>End Date</strong></label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="revamped-date-picker"
          />
        </div>
      </div>
    </div>
  );
};

export default CityAndDateSelector;
