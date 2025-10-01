import { Composer, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import * as dotenv from "dotenv";
import { router as CommandsRouter } from "../modules/router";
import { listToSetCommands } from "./commandsDescription";
import { feedback_scene } from "./scenes/feedback_scene";
import { msgToAdmin } from "./utils/msgToAdmin";
import * as cron from "node-cron";
import { getBinanceFundingRates } from "../api/binance/getBinanceFundingRates";
import { getBybitFundingRates } from "../api/bybit/getBybitFundingRates";

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

cron.schedule(
  "0 0 * * * *",
  async () => {
    const funding = (await getBinanceFundingRates()) ?? [];
    const bybitFunding = await getBybitFundingRates();
    const list = (funding: string[]) => {
      if (funding && funding.length) {
        return funding.map((item, i) => `<b>${i + 1}. </b>${item}`);
      } else {
        return ["Токенов по запросу не найдено"];
      }
    };
    const message = `Binance: \n\n ${list(funding).join(
      "\n"
    )} \n\nBybit: \n\n ${list(bybitFunding).join("\n")}`;

    try {
      await msgToAdmin(message);
    } catch (error) {
      console.error("❌ Ошибка:", error);
    }
  },
  {
    timezone: "Europe/Moscow",
  }
);

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
