import { MyContext } from "../../types/MyContext";
import { funding_history_by_tiker } from "./binance/funding_history_by_tiker";
import { oi_by_tiker } from "./binance/oi_by_tiker";
import { get_funding_rates } from "./get_funding_rates";

export const commandHandlers: Record<
  string,
  (ctx: MyContext) => Promise<any> | void
> = {
  start: async (ctx) =>
    ctx.reply(
      `Привет, ${
        ctx.from?.first_name || "друг"
      }! 👋 Я собираю данные с биржи Binance и Bybit, напиши /help чтобы узнать, что я умею.`
    ),
  funding_history_by_tiker,
  oi_by_tiker,
  get_funding_rates,
  help: async (ctx) => {
    await ctx.reply(
      "Доступные команды:\n" +
        Object.keys(commandHandlers)
          .map((c) => `/${c}`)
          .join("\n")
    );
  },
  feedback: async (ctx) => {
    ctx.scene.enter("feedback_scene");
  },
};
