import React from "react";
import CryptoChartContainer from "./components/CryptoChartContainer.js";

const App = () => {
  const coins = {
    btc: "Bitcoin",
    eth: "Ethereum",
    matic: "Polygon",
  };
  return <CryptoChartContainer coins={coins} />;
};

export default App;
