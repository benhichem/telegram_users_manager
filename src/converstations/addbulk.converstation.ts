import { MyContext, MyConverstation, RegularCsvFormatInput } from "../types/index.js";
import Csv from "../utils/csv.index.js";
import { BuildDownloadUrl, DownloadFile } from "../utils/downloadfile.js";
import { SaveCommand } from "../data/controlers.js";
import AppDataSource from "../providers/database.js";
import { BannedUser } from "../data/entities/banned.entity.js";



/**
 * TODO: Error handling save the error for future debugging
 *
 * @export
 * @param {MyConverstation} converstation
 * @param {MyContext} context
 */
export default async function AddBulkConversation(converstation: MyConverstation, context: MyContext) {
  // Gets a csv from user
  // checks checks if he really wants to validate this move
  // register the command in the database and by whoom and what
  // read the csv
  // loop the list
  // check if the user is in the ban list
  // if not add him to the group

  try {
    await context.reply('Please provide a csv input format \n Name, Username, Message, attachment ')
    let newContext = await converstation.wait()

    // checking if user sent document
    if ('document' in newContext.update?.message!) {
      const DocId = newContext.update.message?.document!.file_id
      let file = await newContext.api.getFile(DocId)
      const newFileurl = await BuildDownloadUrl(file.file_path!)
      await DownloadFile(newFileurl, "./temp/removelist.downloaded.csv")
      let removeUsersList = new Csv("./temp/removelist.downloaded.csv").read<RegularCsvFormatInput>()
      await context.reply(`are you sure you would like to remove ${removeUsersList.length} to the group ? \nplease send 1 to confirm and 2 to cancel the action `)
      const Confirmation = await converstation.form.number()
      // we need to save to the database ...
      switch (Confirmation) {
        case 1:

          await SaveCommand({ username: context.from?.username!, command: "bulk_add" })
          // check if user is in the ban list

          // if yes dont add

          // if no please do add

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


async function addBulkUsers(context:MyContext, newUsers:Array<{name:string; username:string }>){
  const connection = await AppDataSource.initialize()

  for (let index = 0; index < newUsers.length; index++) {
    const element = newUsers[index];
    if('username' in element || 'name' in element){
      const isBanned = await connection.manager.findOneBy(BannedUser, {username:element.username})
      if(isBanned === null){
        //
      }else{

      }

    }

  }
}