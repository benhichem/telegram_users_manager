import { Bot, InputFile } from "grammy";
import { MyContext } from "../types";

//TODO: make this error to be saved for debugging issues
export default async function SendFile(ctx:MyContext, filepath:string, destincationID:number):Promise<void>{
  try {
    const file = new InputFile('output.csv')
    await ctx.api.sendDocument(destincationID, file)
    return
  } catch (error) {
    await ctx.reply('Failed to Send Document ... ')
  }
}