import { chatMembers } from '@grammyjs/chat-members'
import { FileAdapter } from '@grammyjs/storage-file'
import { conversations, createConversation } from '@grammyjs/conversations'
import { Bot, session } from 'grammy'
import { ChatMember } from 'grammy/types'
import {commands} from "../commands/index.js"
import { MyContext } from '../types/index.js'
import ConfigService from './configservice.js'
import BulkMessage from '../converstations/bulkmessage.conversation.js'
import BulkRemoveConversation from '../converstations/bulkremove.converstation.js'
import AddBulkConversation from '../converstations/addbulk.converstation.js'
import AddVipConverstation from '../converstations/addvip.converstation.js'
import AddBannedUserConversation from '../converstations/addbanned.conversation.js'




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

// installing the file Plugin
//application.api.config.use(hydrateFiles(application.token))

// Installing a converstation plugin and a command to exit it
application.use(conversations()).command('cancel',async (ctx)=>{
  await ctx.conversation.exit()
})

application.use(createConversation(BulkMessage, 'bulk_message'))
application.use(createConversation(BulkRemoveConversation,'bulk_remove'))
application.use(createConversation(AddBulkConversation,'bulk_add'))
application.use(createConversation(AddVipConverstation,'add_vip'))
application.use(createConversation(AddBannedUserConversation,'add_banned'))

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
