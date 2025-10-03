import { MyActionContext } from "../../types/MyContext";
import { get_funding_rates } from "../commands/get_funding_rates";
import { help_action } from "../commands/help";

type ActionHandler = (ctx: MyActionContext) => Promise<void>;

export const actions: Record<string, ActionHandler> = {
  HELP: help_action,
  GET_FUNDUNGS: get_funding_rates,
};
