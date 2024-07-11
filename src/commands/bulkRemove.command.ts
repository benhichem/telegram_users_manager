import { Bot } from "grammy";
import Command from "./command.interface.js";
import { MyContext } from "../types/index.js";

export default class BulkRemove extends Command {
  constructor(bot:Bot<MyContext>){
    super(bot)
  }

  async execute(): Promise<void> {
    // enters bulk remove converstation
    this.bot.command('bulkremove',async (ctx)=>{
      await ctx.conversation.enter('bulk_remove')
    })
  }

}