import React, { useState, useEffect } from "react";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const DataVisualization = ({ rawData }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterData();
  }, [rawData, startTime, endTime, frequency]);

  const filterData = () => {
    if (startTime && endTime && frequency && rawData) {
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      let timeRange;
      switch (frequency) {
        case "seconds":
          timeRange = 1000;
          break;
        case "minutes":
          timeRange = 60 * 1000;
          break;
        case "hours":
          timeRange = 60 * 60 * 1000;
          break;
        default:
          timeRange = 0;
          break;
      }

      const filtered = rawData.filter((data) => {
        const dataDate = new Date(data.ts);
        return (
          dataDate >= startDate &&
          dataDate <= endDate &&
          dataDate.getTime() % timeRange === 0
        );
      });

      // Fill missing intervals with value 2 (indicating missing data)
      const filledData = fillMissingIntervals(filtered, timeRange);
      setFilteredData(filledData);
    }
  };

  // Function to fill missing intervals with value 2 (indicating missing data)
  const fillMissingIntervals = (data, timeRange) => {
    const filledData = [];
    let currentTime = new Date(data[0].ts).getTime();

    data.forEach((item) => {
      const itemTime = new Date(item.ts).getTime();
      while (currentTime < itemTime) {
        filledData.push({
          ts: new Date(currentTime).toISOString(),
          machine_status: 2,
        });
        currentTime += timeRange;
      }
      filledData.push(item);
      currentTime += timeRange;
    });

    return filledData;
  };

  const timestamps = filteredData.map((data) => new Date(data.ts));
  const machineStatus = filteredData.map((data) => data.machine_status);

  const data = {
    labels: timestamps.map((time) => time.toLocaleTimeString()),
    datasets: [
      {
        label: "Machine Status",
        data: machineStatus,
        backgroundColor: machineStatus.map((status) => {
          if (status === 0) return "yellow";
          if (status === 1) return "green";
          return "red";
        }),
        lineTension: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "hour",
            displayFormats: {
              hour: "HH:mm",
            },
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
          },
        },
      ],
    },
  };

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
    <div className="mt-8">
      <div className="data-visualization">
        <div className="filter-card">
          <h2 className="filter-title">Data Filter</h2>
          <div className="filter-content">
            <div className="filter-group">
              <label className="filter-label">Start Time:</label>
              <input
                type="datetime-local"
                className="filter-input"
                value={startTime}
                onChange={(e) =>
                  handleFilterChange("startTime", e.target.value)
                }
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
                onChange={(e) =>
                  handleFilterChange("frequency", e.target.value)
                }
              >
                <option value="">Select Frequency</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          </div>
        </div>
        <div className="visualization">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
