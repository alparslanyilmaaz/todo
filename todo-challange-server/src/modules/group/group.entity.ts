import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "../todo/todo.entity";
import { User } from "../user/user.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  createdDate: Date;

  @Column()
  color: string;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @ManyToMany(() => Todo, (todo) => todo.groups)
  todos: Todo[];
}