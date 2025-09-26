import { Telegraf } from "telegraf";
// import * as dotenv from "dotenv";
import { setupCommands } from "./commands";

// dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined in .env");
}

export const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: { testEnv: true },
});

setupCommands(bot);
