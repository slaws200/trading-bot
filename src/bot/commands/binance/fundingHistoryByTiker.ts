import { getFundingHistory } from "../../../api/getFundingRateHistory";
import { MyContext } from "../../../types/MyContext";

export async function fundingHistoryByTiker(ctx: MyContext) {
  const symbol = ctx.message.text.split(" ")[1]?.toUpperCase() || "BTCUSDT";
  const history = await getFundingHistory(symbol, 5);
  let msg = `📊 Funding history for ${symbol}:\n\n`;
  history.forEach((h: any) => {
    msg += `${h.fundingTime} → ${(h.fundingRate * 100).toFixed(3)}%${
      h.fundingRate > 0 ? "📈" : "📉"
    }\n`;
  });
  ctx.reply(msg);
}
