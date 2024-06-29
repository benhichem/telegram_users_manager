import { chatMembers } from '@grammyjs/chat-members'
import { FileAdapter } from '@grammyjs/storage-file'
import { Conversation, createConversation } from '@grammyjs/conversations'
import { Bot, session } from 'grammy'
import { ChatMember } from 'grammy/types'

import commands from "../commands/index.js"
import { MyContext } from '../types/index.js'
import ConfigService from './configservice.js'

// addapters
const adapter = new FileAdapter<ChatMember>({ dirName: 'Sotrage' })



// Bot config and setup
const env = new ConfigService()
const application = new Bot<MyContext>(env.get('BOT_TOKEN'))

// Install the session plugin.
application.use(
  session({
    initial() {
      // return empty object for now
      return {}
    },
  }),
)

// Connect Commands
for (const iterator of commands) {
  await new iterator(application).execute()
}


// Install Plugins
application.use(chatMembers(adapter, { enableAggressiveStorage: true }))


// this will be triggerd on every message ever sent in the group to check if the user is registerd in our database.
application.on('message', async (ctx) => {
  await ctx.chatMembers.getChatMember()
})


export default application
