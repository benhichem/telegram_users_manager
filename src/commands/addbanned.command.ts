import { Bot } from "grammy";
import Command from "./command.interface.js";
import { MyContext } from "../types/index.js";

export default class AddBannedUser extends Command {
  constructor(bot: Bot<MyContext>) {
    super(bot)
  }

  async execute(): Promise<void> {
    // this will save only one user to vip list
    this.bot.command('add_vip', async (ctx: MyContext) => {
      await ctx.conversation.enter('add_banned')
    })
  }
}