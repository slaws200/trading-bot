import { MyContext } from "../../types/MyContext";

export async function feedback(ctx: MyContext) {
  ctx.scene.enter("feedback_scene");
}
