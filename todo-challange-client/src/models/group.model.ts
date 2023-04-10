export interface IGroup {
  id: string;
  color: string;
  name: string;
}

export interface IGroupDTO {
  id: string;
  color: string;
  name: string;
}

export class Group implements IGroup {
  color: string;
  name: string;
  id: string;

  constructor(data: IGroupDTO){
    this.color = data.color;
    this.name = data.name;
    this.id = data.id;
  }
}