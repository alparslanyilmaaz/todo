import { AppDataSource } from '../../datasource';
import { ServerResponse } from '../../utils/server-response';
import { User } from '../user/user.entity';
import { Group } from './group.entity';

export class GroupController {
  private manager;
  
  constructor(){
    this.manager = AppDataSource.manager;
  }
  
  /**
   * Get array of groups
   *
   * @param {string} userId
   * @return {*} 
   * @memberof GroupController
   */
  async getGroups(userId: string) {
    try {
        const groups = await this.manager.find(Group, { where: {
          user: {
            id: userId
          } 
        },
        order: {
          createdDate: 'ASC',
        },
      });
      return ServerResponse.success(groups || []);
    } catch(e) {
      return ServerResponse.error.internal_server_error(e, 'Something went wrong.');
    }
  }
  
  /**
   * Create new Group 
   *
   * @param {string} color
   * @param {string} name
   * @param {string} userId
   * @return {*} 
   * @memberof GroupController
   */
  async createGroup(color: string, name: string, userId: string) {
    // Check required variables
    if(!color || !name || !userId){
      return ServerResponse.error.invalid_request(undefined, 'Please provide valid request body.');
    }

    // Validate user
    const user = await this.manager.findOne(User, {where: {
      id: userId
    }});
    
    if(!user){
      return ServerResponse.error.authorization_required(null, 'Invalid user.');
    }
    
    // Create empty instance of group
    const group = new Group();

    try {
      // Assign values to instance
      group.user = user;
      group.color = color;
      group.name = name;
      group.createdDate = new Date();

      await AppDataSource.manager.save(group);
      return ServerResponse.success({...group, user: {}});
    } catch(e) {
      return ServerResponse.error.internal_server_error(e, 'Something went wrong!');
    }
  }
}