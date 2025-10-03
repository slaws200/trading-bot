import { MyContext } from "../../types/MyContext";
import { oi_by_tiker } from "./binance/oi_by_tiker";
import { feedback } from "./feedback";
import { funding_history_by_tiker } from "./funding_history_by_tiker";
import { get_funding_rates } from "./get_funding_rates";
import { help } from "./help";
import { start } from "./start";

export const commandHandlers: Record<
  string,
  (ctx: MyContext) => Promise<any> | void
> = {
  start,
  oi_by_tiker,
  get_funding_rates,
  feedback,
  funding_history_by_tiker,
  help,
};
