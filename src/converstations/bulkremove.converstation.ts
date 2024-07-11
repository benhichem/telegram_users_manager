import { Context } from "grammy";
import  AppDataSource  from "../providers/database.js";
import { MyContext, MyConverstation, RegularCsvFormatInput } from "../types/index.js";
import Csv from "../utils/csv.index.js";
import { BuildDownloadUrl, DownloadFile } from "../utils/downloadfile.js";
import { User } from "../data/entities/user.entity.js";
import { SaveCommand } from "../data/controlers.js";

/**
 * FIXME: type error file.download doesn't exist
 * requires a csv
 * requires validation from user
 * saves command
 * read the csv
 * checks if user is in the vip list
 * if not remove from group
 *
 * TODO:create an exit function so to reduce duplicates and make the function param type an enum for future ref
 *
 * @export
 * @param {MyConverstation} converstation
 * @param {MyContext} context
 */

export default async function BulkRemoveConversation(converstation: MyConverstation, context: MyContext): Promise<void> {
  try {
    await context.reply(`Please Provide a csv input in the following format \n
      name, username
    `)

    let newContext = await converstation.wait()

    // checking if user sent document
    if ('document' in newContext.update?.message!) {
      const DocId = newContext.update.message?.document!.file_id

      // using the filedownload plugin provided by grammyjs to download the file
      let file = await newContext.api.getFile(DocId)
      const newFileurl = await BuildDownloadUrl(file.file_path!)
      await DownloadFile(newFileurl, "./temp/removelist.downloaded.csv")
      let removeUsersList = new Csv("./temp/removelist.downloaded.csv").read<RegularCsvFormatInput>()
      await context.reply(`are you sure you would like to remove ${removeUsersList.length} to the group ? \nplease send 1 to confirm and 2 to cancel the action `)
      const Confirmation = await converstation.form.number()

      switch (Confirmation) {
        case 1:
          // action confirmed

          //          await connection.manager.save()
          await SaveCommand({ username: context.from?.username!, command: "bulk_remove" })

          await removeUsers(context, removeUsersList)

          //await
          break;
        case 2:
          // action decliend
          console.log(Confirmation)
          await context.reply(`Action remove_bulk was canceled by ${context.from?.username} ...`)
          await context.conversation.exit('bulk_remove')
          break;
        default:
          await context.reply('Picked an undifiend option, operation failed')
          await context.conversation.exit('bulk_remove')
          break;
      }

      return
    } else {
      await context.reply(`Please provide a valid Csv for this command in the format of \n
      name, username
      `)
    }
  } catch (error) {
    console.log(error)
  }
}



/**
 * remove users from the group
 * this should add the users removed to the banned list but that's a future me to worry about
 *  TODO: add a check if name and user name exists before running any telegram command
 * @param {Context} context
 * @param {Array<{username:string}>} usersIds
 * @return {*}  {Promise<void>}
 */
async function removeUsers(context: Context, usersIds: Array<{ name: string, username: string }>): Promise<void> {
  const connection = await AppDataSource.initialize()
  for (let index = 0; index < usersIds.length; index++) {
    // check if usnername or name exists ..
    const element = usersIds[index];
    if('username' in element || 'name' in element ){

      // checks if user is in our group
      const UserID = await connection.manager.findOneBy(User, { username: element.username })
      if (UserID !== null) {
        // chech if is VIP

        //if user aint VIP will be banned.
        await context.banChatMember(UserID.id)
        // if user Is VIP will stay

      } else {
        continue;
      }
    }else{
      continue;
    }


  }
}