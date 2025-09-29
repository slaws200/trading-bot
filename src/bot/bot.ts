import { Composer, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";
import { router as CommandsRouter } from "../modules/router";
import { listToSetCommands } from "./commandsDescription";
import { feedback_scene } from "./scenes/feedback_scene";

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined in .env");
}

export const composer = new Composer<Scenes.SceneContext>();
export const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([feedback_scene]);

bot.use(session());
bot.use(stage.middleware());
bot.use(composer);
// bot.telegram.setMyCommands(listToSetCommands);

composer.on(message("text"), async (ctx) => CommandsRouter(ctx));
