import React, { useState } from "react";
import CryptoChart from "./CryptoChart";

function CryptoChartContainer({ coins }) {
  const [selectedCoin, setSelectedCoin] = useState(
    localStorage.getItem("symbol") || "bitcoin"
  );
  const handleCoinChange = (e) => {
    const newSymbol = e.target.value;
    setSelectedCoin(newSymbol);
    localStorage.setItem(`symbol`, newSymbol);
  };

  return (
    <div className=" container mx-auto p-8">
      <div className=" max-w-[1200px]">
        <h1 className="text-3xl font-bold mb-8">Crypto Price Charts</h1>
        <div className="flex mb-3 items-center">
          <label className="mr-2">Select Coin: </label>
          <select
            className="p-2 rounded-md border border-gray-300"
            value={selectedCoin}
            onChange={handleCoinChange}
          >
            {Object.keys(coins)?.map((key) => (
              <option value={key} key={key}>
                {coins[key]}
              </option>
            ))}
          </select>
        </div>
        <CryptoChart symbol={selectedCoin} coins={coins} />
      </div>
    </div>
  );
}

export default CryptoChartContainer;
