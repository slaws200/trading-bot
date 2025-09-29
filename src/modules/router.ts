import { commandHandlers } from "../bot/commands";
import { MyContext } from "../types/MyContext";

export const router = (ctx: MyContext) => {
  const command = ctx.message?.text;
  if (!command.startsWith("/")) {
    commandHandlers.help(ctx);
    return;
  }
  const handler = command.slice(1);
  commandHandlers[handler](ctx);
};
