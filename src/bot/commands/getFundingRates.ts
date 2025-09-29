import { Context } from "telegraf";
import { showFundingSignals } from "../../api/getBinanceFundingRates";
import { getBybitFundingRates } from "../../api/bybit/getBybitFundingRates";

export async function getFundingRates(ctx: Context) {
  const funding = (await showFundingSignals()) ?? [];
  const bybitFunding = await getBybitFundingRates();
  const list = (funding: string[]) => {
    if (funding && funding.length) {
      return funding.map((item, i) => `<b>${i + 1}. </b>${item}`);
    } else {
      return ["Токенов по запросу не найдено"];
    }
  };

  ctx.reply(
    `Binance: \n\n ${list(funding).join("\n")} \n\nBybit: \n\n ${list(
      bybitFunding
    ).join("\n")}`,
    { parse_mode: "HTML" }
  );
}
