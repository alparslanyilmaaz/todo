import bcrypt from 'bcryptjs';
import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from '../group/group.entity';
import { Todo } from "../todo/todo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Group, (group) => group.user)
  groups: Group[];

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}