import { MyContext } from "../../types/MyContext";

export async function start(ctx: MyContext) {
  ctx.reply(
    `Привет, ${
      ctx.from?.first_name || "друг"
    }! 👋 Я собираю данные с бирж Binance и Bybit, напиши /help чтобы узнать, что я умею.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📈 Высокая волатильность",
              callback_data: "GET_FUNDUNGS",
            },
          ],
          [{ text: "ℹ️ Помощь", callback_data: "HELP" }],
        ],
      },
    }
  );
}
