export interface IconfigService {
  get(key: string): string
}
export interface CsvFile {
  read<T>(): Array<T>
  write<T extends Record<string, any>>(L: Array<T>): void
  update<T>(ID: number, item: T): T
  cross_sections<T>(L1: Array<T>, L2: Array<T>): Array<T>
}

export type chatMessageHistory = {
  name: string;
  type: string;
  id: number;
  messages: Array<any>
}

export type User = {
  id:number;
  first_name?:string
  last_name?:string
  username?:string
}

import { ChatMembersFlavor } from '@grammyjs/chat-members'
import { Conversation, ConversationFlavor } from '@grammyjs/conversations'
import { Context, SessionFlavor } from 'grammy'

interface SessionData {
  favorites: {
    favoriteStations?: string[]
  }
}
export type MyConverstation = Conversation<MyContext>


export type MyContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor & ChatMembersFlavor

