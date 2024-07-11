import { AddNewVip, CheckUser, SaveCommand } from "../data/controlers.js";
import { MyContext, MyConverstation } from "../types";


/**
 * converstation for adding to vip list for now it only takes one user at a time.
 * it can be extended and will be able to take csvs instead
 * @export
 * @param {MyConverstation} conversation
 * @param {MyContext} context
 */
export default async function AddVipConverstation(conversation: MyConverstation, context: MyContext) {
  try {
    await context.reply('add new user to vip list ...')
    await context.reply('Please provide a username or userid')
    let userReply = await conversation.waitFrom(context.from?.id!)

    if (userReply.update.message?.text) {
      // how can i make sure the text sent is a username
      let doesUserExist = await CheckUser(userReply.update.message?.text)
      console.log(doesUserExist)
      if (doesUserExist) {
        await SaveCommand({ username: userReply.update.message.from.username!, command: "add_vip" })
        await AddNewVip(doesUserExist)
        context.reply('User added to vip list')
      } else if (doesUserExist === false) {
        await context.reply('User Does not exist in the group please make sure the user exists first ...')
        return
      }
    } else {
      return
    }
  }
  catch (error) {
    console.log(error)
    await context.reply('Something happen please try again later ...')
  }
}