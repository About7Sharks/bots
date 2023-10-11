// This script fetches the data from the llama stablecoin api and calculates the change in the total stablecoin market cap
// this is a fantastic way to get a quick overview of the stablecoin market
// which often is a leading indicator of the crypto market as a whole
// when more coins are minted, it means people are buying crypto
const getStableCoinData = async () => {
  try {
    const response = await fetch(
      "https://stablecoins.llama.fi/stablecoins?includePrices=true"
    );
    if (!response.ok)
      throw new Error("Network response was not ok " + response.statusText);
    return await response.json();
  } catch (error) {
    console.error("Error making the request:", error);
    throw error;
  }
};

(async () => {
  const data = await getStableCoinData();
  let totalUSD = 0;
  let prevDayUSD = 0;
  data.peggedAssets.map((asset) => {
    if (asset.circulating.peggedUSD) {
      totalUSD += asset.circulating.peggedUSD;
      prevDayUSD += asset.circulatingPrevDay.peggedUSD;
    }
  });
  // calculate the change
  const change = totalUSD - prevDayUSD;
  console.log({ change, totalUSD, prevDayUSD });
  return { change, totalUSD, prevDayUSD };
})();
