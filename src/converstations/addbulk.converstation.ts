import { MyContext, MyConverstation, RegularCsvFormatInput } from "../types/index.js";
import Csv from "../utils/csv.index.js";
import { AproveOrder, AppveOrderCallbacks } from "../keyboards/index.js";
import { AppDataSource } from "../providers/database.js";



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

      // using the filedownload plugin provided by grammyjs to download the file
      let file = await newContext.api.getFile(DocId)
      //@ts-ignore
      let filePath = await file.download(`./temp/${file.file_unique_id}.csv`)

      let newUser = new Csv(filePath).read<RegularCsvFormatInput>()

      // validating the user command
      await context.reply(`are you sure you would like to add ${newUser.length} to the group`, { reply_markup: AproveOrder() })

      let validationCb = await converstation.waitForCallbackQuery(AppveOrderCallbacks, {
        otherwise: async (ctx) => {
          await ctx.reply('Please Use The keyboard provided down below to validate the command ...', { reply_markup: AproveOrder() })
        }
      })

      console.log(validationCb.match[0])

      // we need to save to the database ...

      for (let index = 0; index < newUser.length; index++) {
        const userRow = newUser[index];

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