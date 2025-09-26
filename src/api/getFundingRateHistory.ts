/**
 * История funding rate
 * @param symbol тикер (например, "BTCUSDT")
 * @param limit сколько записей вернуть (макс 1000)
 */
export async function getFundingHistory(symbol: string, limit: number = 10) {
  const url = `https://fapi.binance.com/fapi/v1/fundingRate?symbol=${symbol}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ошибка API: ${res.statusText}`);
  const data = await res.json();
  return data.map((f: any) => ({
    symbol: f.symbol,
    fundingRate: f.fundingRate,
    fundingTime: new Date(f.fundingTime).toLocaleString(),
  }));
}
