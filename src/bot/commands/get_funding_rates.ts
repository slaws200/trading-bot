import { Context } from "telegraf";
import { getBinanceFundingRates } from "../../api/binance/getBinanceFundingRates";
import { getBybitFundingRates } from "../../api/bybit/getBybitFundingRates";

export async function get_funding_rates(ctx: Context) {
  const initialMsg = await ctx.reply("Получаю данные, ждём 🌚");
  const funding = (await getBinanceFundingRates()) ?? [];
  const bybitFunding = await getBybitFundingRates();
  const list = (funding: string[]) => {
    if (funding && funding.length) {
      return funding.map((item, i) => `<b>${i + 1}. </b>${item}`);
    } else {
      return ["Токенов по запросу не найдено"];
    }
  };

  await ctx.telegram.editMessageText(
    initialMsg.chat.id,
    initialMsg.message_id,
    undefined,
    `Binance: \n\n ${list(funding).join("\n")} \n\nBybit: \n\n ${list(
      bybitFunding
    ).join("\n")}`,
    { parse_mode: "HTML" }
  );
}
