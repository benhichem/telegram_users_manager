import { DataSource } from "typeorm";
import { User } from "../data/entities/user.entity.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
})


