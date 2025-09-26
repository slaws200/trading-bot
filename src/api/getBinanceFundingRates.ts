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

async function getTokensByFunding(): Promise<TokenFunding[]> {
  const url = "https://fapi.binance.com/fapi/v1/premiumIndex";
  const { data } = await axios.get<PremiumIndex[]>(url);

  const filtered: TokenFunding[] = data
    .filter(
      (item) => Math.abs(parseFloat(item.lastFundingRate)) >= FUNDING_THRESHOLD
    )
    .map((item) => ({
      symbol: item.symbol,
      funding: (parseFloat(item.lastFundingRate) * 100).toFixed(2),
    }))
    .sort(
      (a, b) =>
        Math.abs(parseFloat(b.funding)) - Math.abs(parseFloat(a.funding))
    );

  return filtered;
}

export async function showFundingSignals(): Promise<void | string[]> {
  const tokens = await getTokensByFunding();

  if (tokens.length === 0) {
    console.log("⚡ Нет токенов с funding > ±0.1%");
    return;
  }

  return tokens
    .slice(0, 10)
    .map(
      (item, i) =>
        `${item.symbol}: ${item.funding}%${+item.funding > 0 ? "📈" : "📉"}`
    );
}
