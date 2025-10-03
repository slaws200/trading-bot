import { commandHandlers } from "./commands";

const commandsNames = Object.keys(commandHandlers);

const commandsDescription: Record<string, string> = {
  start: "Запуск бота",
  oi_by_tiker: "Открытый интерес по тикеру (по умолчанию BTCUSDT)",
  get_funding_rates: "Текущие ставки финансирования",
  help: "Помощь",
  feedback: "Отзыв или предложение",
};

export const listToSetCommands = commandsNames.map((command) => {
  return {
    command: command,
    description: commandsDescription[command],
  };
});
