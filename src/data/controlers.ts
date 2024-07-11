import  AppDataSource  from "../providers/database.js";
import {  commandsenum } from "../commands/index.js";
import { Commands } from "./entities/command.entity.js";
import { BannedUser } from "./entities/banned.entity.js";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity.js";
import { VipUsers } from "./entities/vip.entity.js";


/**
 * this file is composed of a bunch of functions related to our database
 *
 * SaveCommand
 * CheckUser
 * BannedUserControler
 */


type SaveCommandProps = {
  username: string;
  command: commandsenum
}


const connection = await AppDataSource.initialize()


/**
 * saves any command executed on the bot to the database
 *
 * @export
 * @param {SaveCommandProps} SaveProps
 * @return {*}  {Promise<boolean>}
 */
export async function SaveCommand(SaveCommandProps: SaveCommandProps): Promise<boolean> {
  try {
    const commandExecuted = new Commands()
    commandExecuted.username = SaveCommandProps.username,
      commandExecuted.command = SaveCommandProps.username
    connection.manager.save(commandExecuted)
    await connection.destroy()
    return true
  } catch (error) {
    console.log(error)
    await connection.destroy()
    return false
  }
}


type SaveBannedUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string

}


/**
 * This function checks if user does exist in our database
 *
 * @export
 * @param {string} username
 * @return {*}  {Promise<boolean>}
 */
export async function CheckUser(username: string): Promise<User | false> {
  try {
    const connection = await AppDataSource.initialize()
    let user = await connection.manager.findOneBy(User, { username: username })
    if (user === null) {
      await connection.destroy()
      return false
    } else {
      await connection.destroy()
      return user
    }
  } catch (error) {
    // TODO: error handling is required here ...
    await connection.destroy()
    throw error
  }
}

export async function AddNewVip(user: User): Promise<void> {
  try {
    const connection = await AppDataSource.initialize()
    let vip = new VipUsers()
    vip.id = user.id;
    vip.first_name = user.first_name,
      vip.last_name = user.last_name,
      vip.username = user.username
    await connection.manager.save(vip)
    await connection.destroy()
  } catch (error) {
    throw new Error('failed to save to the database ...')
  }
}

/**
 *  a bunch of publc classes that deal with Banned User and the database
 *
 * @class BannedUserControler
 */
class BannedUserControler {
  //private connection: DataSource | null;

  constructor(private connection: DataSource) {
    this.connection = connection
  }

  /**
   *
   *
   * @param {SaveBannedUser} BannedUserProps
   * @return {*}  {Promise<boolean>}
   * @memberof BannedUserControler
   */
  public async SaveBannedUser(BannedUserProps: SaveBannedUser): Promise<boolean> {

    try {
      const BannedUse = new BannedUser()
      BannedUse.id = BannedUserProps.id
      BannedUse.username = BannedUserProps.username
      BannedUse.first_name = BannedUserProps.first_name
      BannedUse.last_name = BannedUserProps.last_name
      this.connection?.manager.save(BannedUse)
      await connection.destroy()
      return true
    } catch (error) {
      console.log(error)
      await connection.destroy()
      return false
    }
  }
}


