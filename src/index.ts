import { bot } from "./bot/bot";

async function bootstrap() {
  await bot.launch();
  console.log("🤖 Bot is running...");
}

bootstrap();

// Чтобы красиво выключать
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
