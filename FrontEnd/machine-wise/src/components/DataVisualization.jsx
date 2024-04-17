import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const DataVisualization = ({ rawData }) => {
  const svgRef = useRef();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [frequency, setFrequency] = useState("seconds");

  // Effect to update the visualization when rawData, startTime, endTime, or frequency changes
  useEffect(() => {
    if (!rawData || rawData.length === 0 || !startTime || !endTime) return;

    // Parse rawData to extract timestamp and machine status
    const data = rawData.map((d) => ({
      timestamp: new Date(d.ts),
      machineStatus: d.machine_status === 1 ? 1 : 0,
    }));

    // Calculate the time range based on the selected frequency
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
        return;
    }

    // Filter data based on startTime, endTime, and frequency
    const filteredData = data.filter((d) => {
      const timestamp = d.timestamp.getTime();
      const startTimestamp = new Date(startTime).getTime();
      const endTimestamp = new Date(endTime).getTime();
      return (
        timestamp >= startTimestamp &&
        timestamp <= endTimestamp &&
        Math.floor((timestamp - startTimestamp) / timeRange) * timeRange +
          startTimestamp ===
          timestamp
      );
    });

    // Update visualization with filteredData
    updateVisualization(filteredData);
  }, [rawData, startTime, endTime, frequency]);

  // Function to update the visualization
  const updateVisualization = (data) => {
    // Remove existing SVG elements
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(svgRef.current);

    // Set up scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.timestamp))
      .range([0, width])
      .padding(0.1);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    // Define color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain([0, 1])
      .range(["yellow", "green"]);

    // Draw bars representing machine status
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.timestamp))
      .attr("y", (d) => yScale(d.machineStatus))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.machineStatus))
      .attr("fill", (d) => colorScale(d.machineStatus));

    // Add X Axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%H:%M:%S")));

    // Add Y Axis
    svg.append("g").call(d3.axisLeft(yScale));

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .text("Machine Status Over Time");
  };

  return (
    <div className="mt-8">
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="frequency">Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </div>
      <svg ref={svgRef} width={800} height={200}></svg>
    </div>
  );
};

export default DataVisualization;
