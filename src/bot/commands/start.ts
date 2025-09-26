import { Context } from "telegraf";

export function startCommand(ctx: Context) {
  ctx.reply(`Привет, ${ctx.from?.first_name || "друг"}! 👋
Я твой новый бот, напиши /help чтобы узнать, что я умею.`);
}
