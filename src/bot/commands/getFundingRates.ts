import { Context } from "telegraf";
import { showFundingSignals } from "../../api/getBinanceFundingRates";

export async function getFundingRates(ctx: Context) {
  const funding = (await showFundingSignals()) ?? [];
  const list = (funding: string[]) => {
    if (funding && funding.length) {
      return funding.map((item, i) => `<b>${i + 1}. </b>${item}`);
    } else {
      return ["Токенов по запросу не найдено"];
    }
  };

  ctx.reply(`${list(funding).join("\n")}`, { parse_mode: "HTML" });
}
