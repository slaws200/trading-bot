import { Telegraf } from "telegraf";
import { startCommand } from "./start";
import { helpCommand } from "./help";
import { getFundingRates } from "./getFundingRates";
import { getOpenInterest } from "../../api/getOpenInterest";
import { getFundingHistory } from "../../api/getFundingRateHistory";
import { getLongShortRatio } from "../../api/getLongShortRatio";

export function setupCommands(bot: Telegraf) {
  bot.start(startCommand);
  bot.help(helpCommand);

  bot.command("getfundingrates", getFundingRates);
  bot.command("ping", (ctx) => ctx.reply("pong 🏓"));
  bot.command("funding_history", async (ctx) => {
    const symbol = ctx.message.text.split(" ")[1]?.toUpperCase() || "BTCUSDT";
    const history = await getFundingHistory(symbol, 5);
    let msg = `📊 Funding history for ${symbol}:\n\n`;
    history.forEach((h: any) => {
      msg += `${h.fundingTime} → ${(h.fundingRate * 100).toFixed(3)}%${
        h.fundingRate > 0 ? "📈" : "📉"
      }\n`;
    });
    ctx.reply(msg);
  });

  bot.command("open_interest", async (ctx) => {
    const symbol = ctx.message.text.split(" ")[1]?.toUpperCase() || "BTCUSDT";
    const oi = await getOpenInterest(symbol, "1h", 5);
    let msg = `📈 Open Interest (1h) for ${symbol}:\n\n`;
    oi.forEach((o: any) => {
      msg += `${o.timestamp} → ${o.sumOpenInterest}${
        o.sumOpenInterest > 0 ? "📈" : "📉"
      }\n`;
    });
    ctx.reply(msg);
  });

  bot.command("longshort", async (ctx) => {
    const symbol = ctx.message.text.split(" ")[1]?.toUpperCase() || "BTCUSDT";
    const ratio = await getLongShortRatio(symbol, "1h", 5);
    let msg = `⚖️ Long/Short ratio (1h) for ${symbol}:\n\n`;
    ratio.forEach((r: any) => {
      msg += `${r.timestamp} → Long: ${r.longAccount}, Short: ${r.shortAccount}, Ratio: ${r.ratio}\n`;
    });
    ctx.reply(msg);
  });
}
