// https://api.bybit.com/v5/market/tickers
import axios from "axios";
import { IBybitTikersRes } from "../../models/bybit/tikers";

export async function getBybitFundingRates(limit: number = 10) {
  const url = "https://api.bybit.com/v5/market/tickers?category=linear";
  try {
    const { data } = (await axios.get<IBybitTikersRes>(url)) ?? [];
    if (!data?.result?.list?.length) {
      return ["Токенов по запросу не найдено"];
    }
    return data.result.list
      .filter((t) => Math.abs(parseFloat(t.fundingRate)))
      .sort(
        (a, b) =>
          Math.abs(parseFloat(b.fundingRate)) -
          Math.abs(parseFloat(a.fundingRate))
      )
      .slice(0, limit)
      .map((t, i) => {
        return { symbol: t.symbol, funding: (+t.fundingRate * 100).toFixed(2) };
      })
      .map(
        (item, i) =>
          `${item.symbol}: ${item.funding}%${+item.funding > 0 ? "📈" : "📉"}`
      );
  } catch (error) {
    return ["Ошибка запроса к данным Bybit"];
  }
}
