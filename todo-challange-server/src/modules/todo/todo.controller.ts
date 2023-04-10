import { In, MoreThan } from 'typeorm';
import { AppDataSource } from '../../datasource';
import { ServerResponse } from '../../utils/server-response';
import { Group } from '../group/group.entity';
import { User } from '../user/user.entity';
import { Todo } from './todo.entity';

export class TodoController {
  private manager;

  constructor() {
    this.manager = AppDataSource.manager;
  }

  /**
   * Create new todo
   *
   * @param {string} todo
   * @param {Date} executionDate
   * @param {string} userId
   * @param {string[]} groupIds
   * @return {*} 
   * @memberof TodoController
   */
  async createTodo(todo: string, executionDate: Date, userId: string, groupIds: string[]) {
    if(!todo || !executionDate || !userId) {
      return ServerResponse.error.invalid_request(undefined, 'Please send required values.');
    }

    // Validate user
    const user = await this.manager.findOne(User, {where: {
      id: userId
    }});
    
    if(!user){
      return ServerResponse.error.authorization_required(null, 'Invalid user.');
    }

    let groups: Group[] = [];
    
    // Get groups by id's
    if(groupIds?.length){
      groups = await this.manager.find(Group, {
        where: {
          id: In(groupIds)
        }
      });
    }

    // Create new instance of todo and assign required values with relations
    const todoInstance = new Todo();
    todoInstance.user = user;
    todoInstance.createdDate = new Date();
    todoInstance.todo = todo;
    todoInstance.groups = groups;
    todoInstance.isCompleted = false;
    todoInstance.executionDate = new Date(executionDate);

    try {
      const createdTodo = await this.manager.save(todoInstance);
      return ServerResponse.success(createdTodo);
    }
    catch(err) {
      return ServerResponse.error.internal_server_error(err, "Something went wrong.");
    }
  }

  /**
   * Get todos
   *
   * @param {string} userId
   * @return {*} 
   * @memberof TodoController
   */
  async getTodos(userId: string) {
    try {
      // Validate user
      const user = await this.manager.findOne(User, {where: {
        id: userId
      }});
      if(user?.id) {
        // Get todos belonging to user
        const todos = await this.manager.find(Todo, {
          where: {
            user: {
              id: userId,
            },
            executionDate: MoreThan(new Date())
          },
          order:{
            // Order todos by their execution date
            executionDate: 'ASC'
          },
          relations: ['groups'],
        });
        return ServerResponse.success(todos);
      } else {
        return ServerResponse.error.authorization_required(null, 'User is invalid.');
      }
    } catch(error){
      return ServerResponse.error.internal_server_error(error, 'Something went wrong!');
    }
  }
  
  /**
   * Update todos with it's relations
   *
   * @param {string} id
   * @param {string} userId
   * @param {string} executionDate
   * @param {string} todo
   * @param {string[]} groupIds
   * @return {*} 
   * @memberof TodoController
   */
  async updateTodo(id: string, userId: string, executionDate: string, todo: string, groupIds: string[]) {
    // Get selected todo for update
    const existingTodo = await this.manager.findOne(Todo, {
      where: {
        id: id,
        user: {
          id: userId
        }
      }
    });
    
    // Get groups
    const groups = await this.manager.find(Group, {
      where: {
        id: In(groupIds)
      }
    });
    if(!existingTodo) return ServerResponse.error.not_found(null, 'Todo not found.');
    // Assign updated values to todo instance
    existingTodo.todo = todo;
    existingTodo.groups = groups;
    existingTodo.executionDate = new Date(executionDate);

    try {
      await this.manager.save(Todo, existingTodo);
      return ServerResponse.no_content();
    } catch(err) {
      console.log(err);
      return ServerResponse.error.internal_server_error(null, 'Something went wrong!');
    }
  }
  
  /**
   * Delete todo by id
   *
   * @param {string} id
   * @param {string} userId
   * @return {*} 
   * @memberof TodoController
   */
  async deleteTodo(id: string, userId: string) {
    // Validate user
    const user = await this.manager.findOne(User, {
      where: {
        id: userId
      }
    });
    if(!user) {
      return ServerResponse.error.authorization_required(null, "Invalid user.");
    }

    // Get deleting todo
    const todo = await this.manager.findOne(Todo, {
      where: {
        id: id,
        user: {
          id: user.id
        }
      }
    });

    try {
      await this.manager.delete(Todo, todo?.id);
      return ServerResponse.no_content();
    } catch(err){
      return ServerResponse.error.internal_server_error(err, 'Something went wrong.');
    }
  }

  /**
   * Toggle Complete of todo
   *
   * @param {string} id
   * @param {boolean} isCompleted
   * @return {*} 
   * @memberof TodoController
   */
  async completeTodo(id: string, isCompleted: boolean) {
    // Get todo
    const todo = await this.manager.findOne(Todo, {
      where: {
        id: id
      }
    });
    if(!todo) return ServerResponse.error.not_found(null, 'Todo not found.')

    todo.isCompleted = isCompleted

    try {
      await this.manager.save(todo);
      return ServerResponse.no_content();
    } catch(e) {
      return ServerResponse.error.internal_server_error(e, 'Something went wrong.');
    }
  }
}