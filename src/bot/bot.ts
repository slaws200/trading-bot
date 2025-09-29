import { Composer, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";
import { router as CommandsRouter } from "../modules/router";
import { listToSetCommands } from "./commandsDescription";
import { feedback_scene } from "./scenes/feedback_scene";
import { msgToAdmin } from "./utils/msgToAdmin";

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
bot.telegram.setMyCommands(listToSetCommands);

composer.on(message("text"), async (ctx) => CommandsRouter(ctx));

bot.catch(async (err, ctx) => {
  const chatId = ctx.chat?.id ?? "unknown";
  const user = ctx.from?.username
    ? `@${ctx.from.username}`
    : ctx.from?.id ?? "unknown";
  const payload = typeof err === "object" && err !== null ? (err as any) : {};
  const name = payload.name ?? "Error";
  const message = payload.message ?? String(err);
  const stack = payload.stack ?? "no stack";
  await msgToAdmin(
    `⚠️ Global error\nChat: ${chatId}\nUser: ${user}\nName: ${name}\nMessage: ${message}\nStack:\n${stack}`
  );
});
