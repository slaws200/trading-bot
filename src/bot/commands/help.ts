import { Context } from "telegraf";

export function helpCommand(ctx: Context) {
  ctx.reply(`
Доступные команды:
/start - запустить бота
/help - помощь
/ping - проверить отклик
/getfundingrates - топ-10 токенов по самой высокой волатильности
/open_interest - открытый интерес указанной валютной пары
/longshort - Соотношение лонг/шорт позициий указанной валютной пары
/funding_history - история фандинга указанной валютной пары
  `);
}
