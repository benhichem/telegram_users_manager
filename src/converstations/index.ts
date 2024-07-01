import { MyContext, MyConverstation, BulkMessageCsv } from "../types";
import Csv from "../utils/csv.index.js";
import { SendMessage } from "../utils/sendfile.js";



/**
 * TODO: need to discuss the attachemnt file system before procceeding with the attachment
 *
 * @export
 * @param {MyConverstation} converstation
 * @param {MyContext} context
 */
export default async function BulkMessage(converstation:MyConverstation, context:MyContext){
  // this should send a message saying we would like to get a file csv
  // get the file and read its inputs ...
  // start sending the messages ...

  // do we need to check if the user is inside the group ?
  // it will return the succesfull sent messages and unssucesfull onces
  await context.reply('Please provide a csv input format \n Name, Username, Message, attachment ')
  let newContext = await converstation.wait()

  // checking if user sent document
  if('document' in newContext.update?.message!){
    const DocId = newContext.update.message?.document!.file_id
    let file = await newContext.api.getFile(DocId)
    //@ts-ignore
    let filePath = await file.download(`./temp/${file.file_unique_id}.csv`)

    let BulkMessageCsv = new Csv(filePath).read<BulkMessageCsv>()

    // TODO: This can be Passed to a sub Process to deal with it so we can reduce the load on our bot
    await SendMessage(context, BulkMessageCsv)

    await context.reply(`Message Sent to ${BulkMessageCsv.length}`)
    return
  }else{
    await context.reply(`Operation failed !! please provide a csv file ...`)
    return
  }
}