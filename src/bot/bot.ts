import * as dotenv from "dotenv";
import { Composer, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { router as CommandsRouter } from "../modules/router";
import { feedback } from "./commands/feedback";
import { get_funding_rates } from "./commands/get_funding_rates";
import { listToSetCommands } from "./commandsDescription";
import { feedback_scene } from "./scenes/feedback_scene";
import { msgToAdmin } from "./utils/msgToAdmin";
import { help_action } from "./commands/help";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not defined in .env");
}

const botOptions = {
  telegram: { testEnv: process.env.NODE_ENV === "development" ? true : false },
};

export const composer = new Composer<Scenes.SceneContext>();
export const bot = new Telegraf<Scenes.SceneContext>(
  process.env.BOT_TOKEN,
  botOptions
);

const stage = new Scenes.Stage([feedback_scene]);

bot.use(session());
bot.use(stage.middleware());
bot.use(composer);
bot.telegram.setMyCommands(listToSetCommands);
bot.action("HELP", async (ctx) => {
  await ctx.answerCbQuery(); // чтобы убрать "часики"
  await help_action(ctx);
});
bot.action("GET_FUNDUNGS", async (ctx) => {
  await ctx.answerCbQuery();
  await get_funding_rates(ctx);
});
bot.action("ALERTS", async (ctx) => {
  await ctx.answerCbQuery();
  await feedback(ctx);
});

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
