import { getOpenInterest } from "../../../api/getOpenInterest";
import { MyContext } from "../../../types/MyContext";

export async function oiByTiker(ctx: MyContext) {
  const symbol = ctx.message.text.split(" ")[1]?.toUpperCase() || "BTCUSDT";
  const oi = await getOpenInterest(symbol, "1h", 5);
  let msg = `📈 Open Interest (1h) for ${symbol}:\n\n`;
  oi.forEach((o: any) => {
    msg += `${o.timestamp} → ${o.sumOpenInterest}${
      o.sumOpenInterest > 0 ? "📈" : "📉"
    }\n`;
  });
  ctx.reply(msg);
}
