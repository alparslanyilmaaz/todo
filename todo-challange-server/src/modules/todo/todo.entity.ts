import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../group/group.entity";
import { User } from "../user/user.entity";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 500})
  todo: string;

  @Column()
  createdDate: Date;

  @Column()
  isCompleted: boolean;

  @Column()
  executionDate: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @ManyToMany(() => Group)
  @JoinTable()
  groups: Group[];
}