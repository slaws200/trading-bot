import { Scenes } from "telegraf";

export async function feedback(ctx: Scenes.SceneContext) {
  ctx.scene.enter("feedback_scene");
}
