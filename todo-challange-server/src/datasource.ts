import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "bizcuit-todo.cs8wmf2ijpbp.eu-central-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "bizcuit-todo.126578",
    database: "todo",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
