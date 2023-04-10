import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../datasource';
import { ServerResponse } from '../../utils/server-response';
import { User } from './user.entity';

export class UserController {
  private manager;

  constructor() {
    this.manager = AppDataSource.manager;
  }
  
/**
 * Create new user and return new token from service
 *
 * @param {string} email
 * @param {string} password
 * @return {*} 
 * @memberof UserController
 */
  async createUser(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;
  
    user.hashPassword();
    try {
      await this.manager.save(user);
      // Sign token for user
      const token = jwt.sign({ 
        id: user.id 
      }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
      return ServerResponse.success({token})
    } catch (error) {
      return ServerResponse.error.internal_server_error(error, "Error occured.");
    }
  }
  
/**
 * Login by existing user.
 *
 * @param {string} email
 * @param {string} password
 * @return {*} 
 * @memberof UserController
 */
  async login(email: string, password: string){
    try {
      const user = await AppDataSource.manager.findOne(User, {where: {email: email}});
      const isMatch = user?.checkIfPasswordMatch(password);
      if(isMatch && user){
        const token = jwt.sign({
          id: user.id
        }, process.env.JWT_SECRET || '', {expiresIn: '1h'});
        return ServerResponse.success({token})
      } else {
        return ServerResponse.error.invalid_request(null, "Username or password is incorrect.");
      }
    } catch(error) {
      return ServerResponse.error.internal_server_error(error, 'Something seems incorrect.');
    }
  }
}