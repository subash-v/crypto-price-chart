import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CheckBox from "./CheckBox";
import { getFormattedData } from "../utils";

const CryptoChart = ({ symbol, coins }) => {
  const savedLines = localStorage.getItem(`${symbol}-visible-lines`);
  const [chartData, setChartData] = useState([]);
  const [visibleLines, setVisibleLines] = useState(
    savedLines ? JSON.parse(savedLines) : ["open", "high", "low", "close"]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: 30,
              interval: "daily",
            },
          }
        );
        setChartData(getFormattedData(response.data.prices));
      } catch (error) {
        setChartData([]);
        console.error("Error fetching data:", error);
      }
    };
    const getDefaultVisibleLines = () => {
      const savedLines = localStorage.getItem(`${symbol}-visible-lines`);
      const data=JSON.parse(savedLines)
      setVisibleLines(
        data ? [...data] : ["open", "high", "low", "close"]
      );
    //   setflag(!flag)

    };
    getDefaultVisibleLines();
    fetchData();
  }, [symbol]);

  const handleLineToggle = (line) => {
    const updatedLines = visibleLines.includes(line)
      ? visibleLines.filter((visibleLine) => visibleLine !== line)
      : [...visibleLines, line];
    setVisibleLines(updatedLines);
    console.log(symbol)
    localStorage.setItem(
      `${symbol}-visible-lines`,
      JSON.stringify(updatedLines)
    );
  };
  const visibleLineOption = [
    {
      label: "Open",
      value: "open",
    },
    {
      label: "High",
      value: "high",
    },
    {
      label: "Low",
      value: "low",
    },
    {
      label: "Close",
      value: "close",
    },
  ];
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
      <h2 className="text-2xl font-semibold mb-10">
        {coins[symbol]} Price Chart
      </h2>
      <div className="overflow-x-auto">
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {visibleLines.map((line) => (
            <Line
              key={line}
              type="monotone"
              dataKey={line}
              stroke={getLineColor(line)}
            />
          ))}
        </LineChart>
        <CheckBox
          options={visibleLineOption}
          onChange={handleLineToggle}
          selected={visibleLines}
        />

        {/* <button onClick={handleSaveView}>Save View</button> */}
      </div>
    </div>
  );
};

function getLineColor(line) {
  const colorMap = {
    open: "#8884d8",
    high: "#82ca9d",
    low: "#ffc658",
    close: "#ff7300",
  };
  return colorMap[line];
}

export default CryptoChart;
