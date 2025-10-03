import { Context, NarrowedContext, Scenes } from "telegraf";
import {
  Update,
  Message,
  CallbackQuery,
} from "telegraf/typings/core/types/typegram";

export type MyContext = Scenes.SceneContext &
  NarrowedContext<
    Context<Update>,
    Update.MessageUpdate<Record<"text", {}> & Message.TextMessage>
  >;

export type MyActionContext = Scenes.SceneContext &
  NarrowedContext<Context<Update>, Update.CallbackQueryUpdate<CallbackQuery>>;
