import { Group, IGroupDTO } from "./group.model";

export interface ITodo {
  id: string;
  todo: string;
  createdDate: string;
  executionDate: Date;
  isCompleted: boolean;
  groups: Group[];
  parsedDate: string;
  parsedTime: string;
}

export interface ITodoDTO {
  id: string;
  todo: string;
  createdDate: string;
  executionDate: Date;
  isCompleted: boolean;
  groups: IGroupDTO[];
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export class Todo implements ITodo {
  id: string;
  todo: string;
  createdDate: string;
  executionDate: Date;
  isCompleted: boolean;
  groups: Group[];
  parsedDate: string;
  parsedTime: string;

  constructor(data: ITodoDTO){
    this.id = data.id;
    this.todo = data.todo;
    this.createdDate = data.createdDate;
    this.executionDate = data.executionDate;
    this.isCompleted = data.isCompleted;
    this.groups = data.groups?.map((item) => new Group(item));
    
    const date = new Date(data.executionDate);
    this.parsedDate = this.parseDate(date);
    this.parsedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  parseDate(date: Date){
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();
    const dateDay = date.getDate();
  
    if (
      dateYear === today.getFullYear() &&
      dateMonth === today.getMonth() &&
      dateDay === today.getDate()
    ) {
      return 'Today';
    } else if (
      dateYear === tomorrow.getFullYear() &&
      dateMonth === tomorrow.getMonth() &&
      dateDay === tomorrow.getDate()
    ) {
      return 'Tomorrow';
    } else {
      return `${dateDay} ${months[dateMonth]} ${dateYear}`;
    }
  }
}