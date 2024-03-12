export function getFormattedData(prices) {
  const formattedData = prices.map((price, index) => {
    const [timestamp, value] = price;
    const nextPrice = prices[index + 1];

    const open = value;
    const close = nextPrice ? nextPrice[1] : value;
    const high = Math.max(value, close);
    const low = Math.min(value, close);

    return {
      time: new Date(timestamp).toLocaleDateString(),
      open,
      high,
      low,
      close,
    };
  });
  return formattedData;
}
