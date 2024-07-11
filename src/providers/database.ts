import { DataSource } from "typeorm";
import { Entities } from "../data/entities/index.js";



class AppDataSource {
    private static instance: DataSource | null = null;

    private constructor() { }

    public static getInstance(): DataSource {
        if (!AppDataSource.instance) {
            AppDataSource.instance = new DataSource({
              type: "sqlite",
              database: "database.sqlite",
              synchronize: true,
              logging: true,
              entities: Entities,
              subscribers: [],
              migrations: [],
            });
        }
        return AppDataSource.instance;
    }

    public static async initialize(): Promise<DataSource> {
        const dataSource = AppDataSource.getInstance();
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        return dataSource;
    }
}

export default AppDataSource;
