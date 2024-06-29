import Command from './command.interface.js'
import { Bot } from 'grammy'
import { MyContext } from '../types/index.js'
import { AppDataSource } from '../providers/database.js'
import { User } from '../data/entities/user.entity.js'
import ReadCMPStorage from '../utils/read_chat_member_plugin_storage.js'
import Csv from "../utils/csv.index.js"
import {SendFile} from '../utils/sendfile.js'

//TODO: please change the path to the output file to be ./temp/userlist.csv



async function GenerateUsersListFunc() {
  // this should read from the database all the saved Users
  // and put it into a csv
  try {
    const connection = await AppDataSource.initialize()
    // we also need to get all values saved by the
    const StorageUsers = new ReadCMPStorage('./Sotrage').GetUsers()
    // this is bad logic because its expensive and repetitive.
    for (let index = 0; index < StorageUsers.length; index++) {
      const element = StorageUsers[index];
      const isSaved = await connection.manager.findBy(User, { id: element.id })
      if (isSaved.length === 0) {
        const newUser = new User()
        newUser.id = element.id
        newUser.first_name = element.first_name ? element.first_name : ""
        newUser.last_name = element.last_name ? element.last_name : ""
        newUser.username = element.username ? element.username : ""
        await connection.manager.save(newUser)
      } else {
        // might add more verification here in the future.
        continue;
      }
    }

    // we create a csv from all the data and ship it to user .
    const users = await connection.manager.find(User)
    return users

    // we need to send it to private user only .
  } catch (error) {
    // TODO: add an error logger here for debugging
    return []
  }
}



export default class GenerateUsersList extends Command {
  constructor(bot: Bot<MyContext>) {
    super(bot)
  }

  async execute(): Promise<void> {
    this.bot.command('userlist', async (ctx) => {
      try {

        // we check if the user is an admin or not
        let userID = ctx.message?.from
        let admins = await ctx.getChatAdministrators()
        let isAdmin = admins.find((chatMember) => chatMember.user.id === userID?.id)
        console.log(isAdmin)
        if (isAdmin !== undefined) {
          let users = await GenerateUsersListFunc()
          if (users.length !== 0) {
            await SendFile(ctx, "output.ts", userID?.id!)
          }
          await ctx.reply('This should be our Generate Function')
        } else {
          await ctx.reply('Sorry but you do not have permissions to run this command ...')
        }
      } catch (error) {
        await ctx.reply('Some issue happend please try again later.')
        //TODO: add error logger here for debbugging later
      }
    })
  }
}




