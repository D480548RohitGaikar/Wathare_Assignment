import React, { useEffect, useState } from "react";

const DataSummary = ({ rawData }) => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    if (!rawData || rawData.length === 0) return;

    let zerosCount = 0;
    let onesCount = 0;
    let currentStreak = 0;
    let longestZeroStreak = 0;
    let longestOneStreak = 0;

    for (const data of rawData) {
      if (data.machine_status === 0) {
        zerosCount++;
        currentStreak++;
        longestOneStreak = Math.max(longestOneStreak, currentStreak);
        currentStreak = 0;
      } else if (data.machine_status === 1) {
        onesCount++;
        currentStreak++;
        longestZeroStreak = Math.max(longestZeroStreak, currentStreak);
        currentStreak = 0;
      }
    }

    setSummaryData([
      { category: "Number of 0s", count: zerosCount },
      { category: "Number of 1s", count: onesCount },
      { category: "Longest streak of 0s", count: longestZeroStreak },
      { category: "Longest streak of 1s", count: longestOneStreak },
    ]);
  }, [rawData]);

  return (
    <div className="mt-8">
      <div className="card">
        {" "}
        {/* Card container */}
        <h2 className="card-title">Data Summary</h2>
        <table className="table">
          {" "}
          <thead>
            <tr>
              <th className="table-header">Category</th>
              <th className="table-header">Count</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((row, index) => (
              <tr key={index}>
                <td className="table-body">{row.category}</td>
                <td className="table-body">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSummary;
