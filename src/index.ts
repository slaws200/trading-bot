import { bot } from "./bot/bot";

async function bootstrap() {
  console.log("🤖 Bot is running...");
  await bot.launch();
}

bootstrap();

// Чтобы красиво выключать
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
