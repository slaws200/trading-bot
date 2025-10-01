import { bot } from "../bot";

export async function msgToAdmin(message: string) {
  try {
    await bot.telegram.sendMessage(1588720592, message, { parse_mode: "HTML" });
  } catch (error) {
    console.error("Ошибка отправки:", error);
  }
}
