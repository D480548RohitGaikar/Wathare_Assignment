import React, { useState, useEffect } from "react";
import DataVisualization from "./components/DataVisualization";
import DataSummary from "./components/DataSummary";
import TemperatureInfo from "./components/TemperatureInfo";
import DataFilter from "./components/DataFilter";

import data from "./data/sample-data.json";

const App = () => {
  const [rawData, setRawData] = useState(data);
  const [filterOptions, setFilterOptions] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/data");
  //       const data = await response.json();
  //       setRawData(data.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   const fetchFilterOptions = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/filter-data");
  //       const data = await response.json();
  //       setFilterOptions(data);
  //     } catch (error) {
  //       console.error("Error fetching filter options:", error);
  //     }
  //   };

  //   fetchData();
  //   fetchFilterOptions();
  // }, []);

  // const handleFilter = (filterData) => {
  //   setRawData(filterData);
  // };

  return (
    <div className="app-container bg-gray-100 min-h-screen p-8">
      <h1 className="card-title">Data Visualization</h1>
      <div className="data-section grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <DataVisualization rawData={rawData} />
          <DataSummary rawData={rawData} />
        </div>
        <div>
          <TemperatureInfo />
          {/* <DataFilter filterOptions={filterOptions} onFilter={handleFilter} /> */}
          {/* <DataFilter rawData={rawData} /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
