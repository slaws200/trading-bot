import { Context, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/typings/core/types/typegram";

export type MyContext = NarrowedContext<
  Context<Update>,
  Update.MessageUpdate<Record<"text", {}> & Message.TextMessage>
>;
