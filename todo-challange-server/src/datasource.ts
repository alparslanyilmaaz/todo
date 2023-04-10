import "reflect-metadata"
import { DataSource } from "typeorm"
import { Group } from "./modules/group/group.entity"
import { Todo } from "./modules/todo/todo.entity"
import { User } from "./modules/user/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATA_SOURCE_HOST || 'localhost',
    port: 3306,
    username: process.env.DATA_SOURCE_USERNAME || 'root',
    password: process.env.DATA_SOURCE_PASSWORD ||  'root',
    database: "todo",
    synchronize: true,
    logging: false,
    entities: [User, Group, Todo],
    migrations: [],
    subscribers: [],
})
