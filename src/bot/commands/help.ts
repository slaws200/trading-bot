import { commandHandlers } from ".";
import { MyContext } from "../../types/MyContext";
import { Scenes } from "telegraf";

export async function help(ctx: MyContext) {
  await ctx.reply(
    "Доступные команды:\n" +
      Object.keys(commandHandlers)
        .map((c) => `/${c}`)
        .join("\n")
  );
}

export async function help_action(ctx: Scenes.SceneContext) {
  await ctx.reply(
    "Доступные команды:\n" +
      Object.keys(commandHandlers)
        .map((c) => `/${c}`)
        .join("\n")
  );
}
