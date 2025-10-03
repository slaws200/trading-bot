export const toFundingRateFormat = (text: string | number) => {
  if (typeof text === "string" && !+text) {
    throw new Error("Ошибка преобразования строки к числу");
  }
  return `${text}%${+text > 0 ? "📈" : "📉"}`;
};
