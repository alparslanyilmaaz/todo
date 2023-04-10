import "reflect-metadata"
import { DataSource } from "typeorm"
import { Group } from "./modules/group/group.entity"
import { Todo } from "./modules/todo/todo.entity"
import { User } from "./modules/user/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATA_SOURCE_HOST,
    port: parseInt(process.env.DATA_SOURCE_PORT || '3306', 10),
    username: process.env.DATA_SOURCE_USERNAME,
    password: process.env.DATA_SOURCE_PASSWORD,
    database: process.env.DATA_SOURCE_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Todo, Group],
    migrations: [],
    subscribers: [],
})
