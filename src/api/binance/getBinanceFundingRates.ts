import axios from "axios";

const FUNDING_THRESHOLD = 0.001;

interface PremiumIndex {
  symbol: string;
  markPrice: string;
  indexPrice: string;
  estimatedSettlePrice: string;
  lastFundingRate: string;
  interestRate: string;
  nextFundingTime: number;
  time: number;
}

interface TokenFunding {
  symbol: string;
  funding: string;
}

export async function getBinanceFundingRates(): Promise<void | string[]> {
  const url = "https://fapi.binance.com/fapi/v1/premiumIndex";
  try {
    const { data } = await axios.get<PremiumIndex[]>(url);

    const filtered: TokenFunding[] = data
      .filter(
        (item) =>
          Math.abs(parseFloat(item.lastFundingRate)) >= FUNDING_THRESHOLD
      )
      .map((item) => ({
        symbol: item.symbol,
        funding: (parseFloat(item.lastFundingRate) * 100).toFixed(2),
      }))
      .sort(
        (a, b) =>
          Math.abs(parseFloat(b.funding)) - Math.abs(parseFloat(a.funding))
      );

    return filtered
      .slice(0, 10)
      .map(
        (item, i) =>
          `${item.symbol}: ${item.funding}%${+item.funding > 0 ? "📈" : "📉"}`
      );
  } catch (error) {
    return ["Ошибка при запросе к данным Binance"];
  }
}
