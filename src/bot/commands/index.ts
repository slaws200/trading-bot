import { getFundingRates } from "./getFundingRates";
import { start } from "./start";
import { oiByTiker } from "./binance/oiByTiker";
import { MyContext } from "../../types/MyContext";
import { fundingHistoryByTiker } from "./binance/fundingHistoryByTiker";

export const commandHandlers: Record<
  string,
  (ctx: MyContext) => Promise<any> | void
> = {
  start,
  fundingHistoryByTiker,
  oiByTiker,
  getFundingRates,
  help: async (ctx) => {
    await ctx.reply(
      "Доступные команды:\n" +
        Object.keys(commandHandlers)
          .map((c) => `/${c}`)
          .join("\n")
    );
  },
};
