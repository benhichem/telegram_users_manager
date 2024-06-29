import { Bot } from "grammy";
import { MyContext } from "../types";

export default abstract class Command {
  constructor(protected bot:Bot<MyContext>){

  }

  abstract execute():Promise<void>
}

