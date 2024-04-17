import React, { useState, useEffect } from "react";

const DataFilter = ({ rawData }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [frequency, setFrequency] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  // Effect to filter data whenever filter criteria change
  useEffect(() => {
    filterData();
  }, [rawData, startTime, endTime, frequency]);

  // Function to filter data based on filter criteria
  const filterData = () => {
    if (startTime && endTime && frequency) {
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      // Calculate time range based on frequency
      let timeRange;
      switch (frequency) {
        case "hour":
          timeRange = 60 * 60 * 1000;
          break;
        case "day":
          timeRange = 24 * 60 * 60 * 1000;
          break;
        case "week":
          timeRange = 7 * 24 * 60 * 60 * 1000;
          break;
        case "month":
          // Approximate value for 30 days
          timeRange = 30 * 24 * 60 * 60 * 1000;
          break;
        default:
          timeRange = 0; // No time range
          break;
      }

      // Filter rawData based on time range
      const filtered = rawData.filter((data) => {
        const dataDate = new Date(data.ts);
        return dataDate >= startDate && dataDate <= endDate;
      });

      setFilteredData(filtered);
    }
  };

  // Function to render the filtered data visualization
  const renderVisualization = () => {
    return (
      <div className="visualization">
        <p>Filtered Data Count: {filteredData.length}</p>
      </div>
    );
  };

  // Function to handle changes in filter criteria
  const handleFilterChange = (filterName, value) => {
    switch (filterName) {
      case "startTime":
        setStartTime(value);
        break;
      case "endTime":
        setEndTime(value);
        break;
      case "frequency":
        setFrequency(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="data-visualization">
      {/* Data filter section */}
      <div className="filter-card">
        <h2 className="filter-title">Data Filter</h2>
        <div className="filter-content">
          <div className="filter-group">
            <label className="filter-label">Start Time:</label>
            <input
              type="datetime-local"
              className="filter-input"
              value={startTime}
              onChange={(e) => handleFilterChange("startTime", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">End Time:</label>
            <input
              type="datetime-local"
              className="filter-input"
              value={endTime}
              onChange={(e) => handleFilterChange("endTime", e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Frequency:</label>
            <select
              className="filter-input"
              value={frequency}
              onChange={(e) => handleFilterChange("frequency", e.target.value)}
            >
              <option value="">Select Frequency</option>
              <option value="hour">Hour</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>
      </div>
      {/* Data visualization section */}
      {renderVisualization()}
    </div>
  );
};

export default DataFilter;
