import { InlineKeyboard } from "grammy";

export const AppveOrderCallbacks:Array<string> = ['yes','no']

/**
 * inline keyboard we use to triger validation for the admin commands
 * two callbacks as follows approved and rejected
 *
 * @export
 * @return {*} InlineKeyboard
 */
export function AproveOrder(): InlineKeyboard {
  return new InlineKeyboard().text('Yes','yes').text('no','yes')
}