import { InputFile } from "grammy";
import { BulkMessageCsv, MyContext } from "../types";
import { AppDataSource } from "../providers/database.js";
import { User } from "../data/entities/user.entity.js";

//TODO: make this error to be saved for debugging issues
export async function SendFile(ctx: MyContext, filepath: string, destincationID: number): Promise<void> {
  try {
    const file = new InputFile('output.csv')
    await ctx.api.sendDocument(destincationID, file)
    return
  } catch (error) {
    await ctx.reply('Failed to Send Document ... ')
  }
}

export async function SendMessage(ctx: MyContext, messages: Array<BulkMessageCsv>) {
  if (messages.length === 0) return
  const connection = await AppDataSource.initialize()
  for (let index = 0; index < messages.length; index++) {
    try {
      const message = messages[index];
      const byUsername = await connection.manager.findOneBy(User, { username: message.username })
      if (byUsername) {
        let messageSent = await ctx.api.sendMessage(byUsername.id, message.message)
      }
    } catch (error) {
      // TODO: Please log in for future debuggin
    }
  }

}