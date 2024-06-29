import Command from "./command.interface.js";
import { Bot } from "grammy";
import { MyContext } from "../types/index.js";
import { AppDataSource } from "../providers/database.js";
import { User } from "../data/entities/user.entity.js";



export default class BulkMessage extends Command{
  constructor(bot:Bot<MyContext>){
    super(bot);
  }
  async execute(): Promise<void> {
    // this requires a csv input
    // this requires a converstation for validation


  }
}