import Command from './command.interface.js'
import { Bot } from 'grammy'
import { MyContext } from '../types/index.js'
export default class StartCommand extends Command {
  constructor(bot: Bot<MyContext>) {
    super(bot)
  }

  async execute(): Promise<void> {
    this.bot.command('start', async (ctx) => {
      await ctx.reply('Starting Strong my boi ... ')
    })
  }
}
