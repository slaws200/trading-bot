import { Scenes } from "telegraf";
import { msgToAdmin } from "../utils/msgToAdmin";

interface ScContext extends Scenes.SceneContext {
  myProp?: string;
}

export const feedback_scene = new Scenes.BaseScene<ScContext>("feedback_scene");

feedback_scene.enter(async (ctx) => {
  ctx.reply(
    "Оставьте свой отзыв или пожелание, расскажите о том какими функциями пользуетесь и каких вам не хватает, мы учтём ваши пожелания и постараемся обновить функционал в скором времени!",
    {
      reply_markup: {
        keyboard: [[{ text: "Выйти из формы" }]],
        resize_keyboard: true,
      },
    }
  );
});

// Обработчик текстовых сообщений
feedback_scene.on("text", (ctx) => {
  if (ctx.message.text === "Выйти из формы") {
    ctx.reply("Вы вышли из режима поддержки", {
      reply_markup: { remove_keyboard: true },
    });
    return ctx.scene.leave();
  } else {
    msgToAdmin(ctx.message.text);
    ctx.reply(
      "Ваше сообщение отправлено администратору. Спасибо за обратную связь!",
      {
        reply_markup: { remove_keyboard: true },
      }
    );
    return ctx.scene.leave();
  }
});
