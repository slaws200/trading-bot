import { Scenes } from "telegraf";
import { msgToAdmin } from "../utils/msgToAdmin";
import { getFundingHistory } from "../../api/getFundingRateHistory";

interface ScContext extends Scenes.SceneContext {
  myProp?: string;
}

export const funding_history_scene = new Scenes.BaseScene<ScContext>(
  "funding_history_scene"
);

funding_history_scene.enter(async (ctx) => {
  await ctx.reply("Введите тикер, например BTC, SOL или ETH", {
    reply_markup: {
      keyboard: [[{ text: "Выйти из формы" }]],
      resize_keyboard: true,
    },
  });
});

// Обработчик текстовых сообщений
funding_history_scene.on("text", async (ctx) => {
  if (ctx.message.text === "Выйти из формы") {
    await ctx.reply("Вы вышли из режима поддержки", {
      reply_markup: { remove_keyboard: true },
    });
    return ctx.scene.leave();
  }
  if (ctx.message.text.startsWith("/")) {
    return ctx.reply("Отправьте обычное сообщение, не команду");
  }
  try {
    const res = await getFundingHistory(
      ctx.message.text.toUpperCase() + "USDT",
      10
    );
    let msg = `📊 Funding history for ${ctx.message.text.toUpperCase() + "USDT"}:\n\n`;
    res.forEach((h: any) => {
      msg += `${h.fundingTime} → ${(h.fundingRate * 100).toFixed(3)}%${
        h.fundingRate > 0 ? "📈" : "📉"
      }\n`;
    });
    await ctx.reply(msg, {
      reply_markup: { remove_keyboard: true },
    });
  } catch (error) {
    if(error instanceof Error){
      await ctx.reply(`Ошибка запроса, передайте сообщение тех. поддержке - ${error.message}`, {
        reply_markup: { remove_keyboard: true },
      });
    }
  } finally {
    return ctx.scene.leave();
  }
});
