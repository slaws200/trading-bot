/**
 * Соотношение Long / Short
 * @param symbol тикер (например, "BTCUSDT")
 * @param period интервал ("5m","15m","1h","4h","1d")
 * @param limit сколько записей вернуть (по умолчанию 10)
 */
export async function getLongShortRatio(
  symbol: string,
  period: string = "1h",
  limit: number = 10
) {
  const url = `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=${period}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ошибка API: ${res.statusText}`);
  const data = await res.json();
  return data.map((ls: any) => ({
    symbol: ls.symbol,
    longAccount: ls.longAccount,
    shortAccount: ls.shortAccount,
    ratio: (ls.longAccount / ls.shortAccount).toFixed(2),
    timestamp: new Date(ls.timestamp).toLocaleString(),
  }));
}
