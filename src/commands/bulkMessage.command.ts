import Command from "./command.interface.js";
import { Bot } from "grammy";
import { MyContext } from "../types/index.js";


export default class BulkMessage extends Command{
  constructor(bot:Bot<MyContext>){
    super(bot);
  }
  async execute(): Promise<void> {
    // this requires a csv input
    // this requires a converstation for validation
    this.bot.command('bulkmessage',async (ctx:MyContext)=>{
      await ctx.conversation.enter('bulk_message')
    })

  }
}