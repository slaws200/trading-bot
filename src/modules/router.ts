import { commandHandlers } from "../bot/commands";
import { MyContext } from "../types/MyContext";

export const router = (ctx: MyContext) => {
  const command = ctx.message?.text;
  if (!command.startsWith("/")) {
    ctx.reply(
      "Я понимаю только команды, используй меню или вызови /help раздел помощи☺️"
    );
    return;
  }
  const handler = command.slice(1);
  Object.keys(commandHandlers).includes(handler)
    ? commandHandlers[handler](ctx)
    : ctx.reply(
        "Я не знаю этой команды, попробуйте посмотреть здесь /help, что я умею!"
      );
};
