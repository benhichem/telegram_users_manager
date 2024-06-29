import { Api } from 'grammy'
import { ChatMember } from 'grammy/types'
import fs from 'node:fs'

import { User } from '../data/entities/user.entity.js'
import ConfigService from '../providers/configservice.js'
import { AppDataSource } from '../providers/database.js'
import { chatMessageHistory } from "../types/index.js"

const config = new ConfigService()
const CHATMESSAGESPATH = process.argv[2];


try {
  console.log('******************************** THIS NEEDS TO BE BETTER ********************************');
  let connection = await AppDataSource.initialize()
  console.log('[+] Connection To database established Perfectly ...')
  const CHATHISTORYSTRING = fs.readFileSync(CHATMESSAGESPATH, { encoding: 'utf8' })
  const CHATHISTORYJSON: chatMessageHistory = JSON.parse(CHATHISTORYSTRING)
  console.log('[+] Importing Chat history ...');
  console.log(`[+] Collected ${CHATHISTORYJSON.messages.length} message ...`)
  console.log('[!] Process might take some time to finish please sit back and relax ...')
  const USERIDS: Set<number> = new Set()
  const TELEGRAMAPICONNECTION = new Api(config.get('BOT_TOKEN'))
  CHATHISTORYJSON.messages.map((message) => { if ('from_id' in message) { USERIDS.add(eval(message.from_id.split('user')[1])) } })

  for (const id of USERIDS) {
    await TELEGRAMAPICONNECTION
      .getChatMember(config.get('GROUP_CHAT_ID'), id)
      .then(async (result: ChatMember) => {
        // this means he is still in the Gorup chat
        console.log(result)
        let user = new User()
        user.id = result.user.id
        user.username = result.user.username ? result.user.username : ""
        user.last_name = result.user.last_name ? result.user.last_name : ""
        user.first_name = result.user.first_name ? result.user.first_name : ""
        await connection.manager.save(user)

      })
      .catch((err) => {
        // this means that he left the group chat
        // this catch here will save the users that have left the group
      })
  }
  console.log('[+] Process finished thank you ...')

}
catch (error) {
  if (error instanceof Error) {
    // Handle errors (file not found, no permission, etc.)
    console.error('Error reading file:', error.message);
    // Optionally, you can inspect error properties like error.code
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error('File not found!');
    } else if ((error as NodeJS.ErrnoException).code === 'EACCES') {
      console.error('Permission denied!');
    } else {
      console.error('An unexpected error occurred.');
    }
  } else {
    console.error('An unknown error occurred.');
  }
}
