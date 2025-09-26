import { Context } from "telegraf";

export function startCommand(ctx: Context) {
  ctx.reply(`Привет, ${ctx.from?.first_name || "друг"}! 👋
Я собираю данные с биржи Binance, напиши /help чтобы узнать, что я умею.`);
}
