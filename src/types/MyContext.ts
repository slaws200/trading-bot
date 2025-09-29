import { Context, NarrowedContext, Scenes } from "telegraf";
import { Update, Message } from "telegraf/typings/core/types/typegram";

export type MyContext = Scenes.SceneContext &
  NarrowedContext<
    Context<Update>,
    Update.MessageUpdate<Record<"text", {}> & Message.TextMessage>
  >;
