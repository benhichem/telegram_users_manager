import { InputFile } from "grammy";
import { BulkMessageCsv, MyContext } from "../types";
import  AppDataSource from "../providers/database.js";
import { User } from "../data/entities/user.entity.js";


/**
 * sends a document to a user in private chat
 * TODO: make this error to be saved for debugging issues
 *
 * @export
 * @param {MyContext} ctx
 * @param {string} filepath
 * @param {number} destincationID
 * @return {*}  {Promise<void>}
 */
export async function SendFile(ctx: MyContext, filepath: string, destincationID: number): Promise<void> {
  try {
    const file = new InputFile(filepath)
    await ctx.api.sendDocument(destincationID, file)
    return
  } catch (error) {
    await ctx.reply('Failed to Send Document ... ')
  }
}



/**
 * FIXME: sendMessage
 * sends a message in private to a user
 * when i coded this i didn't know that the rate limit of telegram api is 30 messages per 1 min
 * so i need to refactor this code to accecpt the rate limit of telegram.
 *
 * @export
 * @param {MyContext} ctx
 * @param {Array<BulkMessageCsv>} messages
 */
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