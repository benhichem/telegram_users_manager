import { DataSource } from "typeorm";
import { BannedUser } from "./banned.entity.js";
import { Commands } from "./command.entity.js";
import { User } from "./user.entity.js";
import { VipUsers } from "./vip.entity.js";



export const Entities = [User, Commands,BannedUser,VipUsers]
export { BannedUser } from "./banned.entity.js";
export { Commands } from "./command.entity.js";
export { User } from "./user.entity.js";
export {VipUsers} from "./vip.entity.js"

class AppDataSource {
  private static instance: DataSource;

  private constructor() { }

  public static getInstance(): DataSource {
      if (!AppDataSource.instance) {
          AppDataSource.instance = new DataSource({
              type: "mysql", // replace with your database type
              host: "localhost",
              port: 3306, // default port for MySQL
              username: "test",
              password: "test",
              database: "test",
              entities: [__dirname + "/entities/*.ts"], // path to your entity files
              synchronize: true, // synchronize database schema (use with caution in production)
          });
      }
      return AppDataSource.instance;
  }

  public static async initialize(): Promise<DataSource> {
      if (!AppDataSource.instance.isInitialized) {
          await AppDataSource.instance.initialize();
      }
      return AppDataSource.instance;
  }
}