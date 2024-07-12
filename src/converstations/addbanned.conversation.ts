import { AddBannedUser, CheckUser, SaveCommand } from "../data/controlers.js";
import { MyContext, MyConverstation} from "../types/index.js";


/**
 * TODO: Error handling save the error for future debugging
 *
 * @export
 * @param {MyConverstation} converstation
 * @param {MyContext} context
 */
export default async function AddBannedUserConversation(converstation: MyConverstation, context: MyContext) {
  try {

    await context.reply('add user to banned list ...')
    await context.reply('Please provide a username or userid')
    let userReply = await converstation.waitFrom(context.from?.id!)
    if (userReply.update.message?.text) {
      // how can i make sure the text sent is a username
      let doesUserExist = await CheckUser(userReply.update.message?.text)
      if (doesUserExist) {
        await SaveCommand({ username: userReply.update.message.from.username!, command: "add_banned_user" })

        if(await AddBannedUser(doesUserExist)){
          await context.banChatMember(doesUserExist.id)
          await context.reply(`banned ${doesUserExist.username} from the group ...`)
        }else{
          await context.reply('Something wrong happend please try again later')
        }
        context.reply('User added to vip list')
      } else if (doesUserExist === false) {
        await context.reply('User Does not exist in the group please make sure the user exists first ...')
        return
      }
    } else { return }
  } catch (error) {

  }
}