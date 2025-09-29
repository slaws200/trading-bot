import { Composer, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";
import { router as CommandsRouter } from "../modules/router";
import { listToSetCommands } from "./commandsDescription";

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined in .env");
}

export const composer = new Composer();
export const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());
bot.use(composer);
bot.telegram.setMyCommands(listToSetCommands);

composer.on(message("text"), async (ctx) => CommandsRouter(ctx));
