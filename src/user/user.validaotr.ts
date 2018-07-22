import Validator from '../validator';
import { UserController } from './user.controller';
import { doesntThrowAsync } from '../helpers/functions';

export default class UserValidator extends Validator {
  async userExists(id): Promise<boolean> {
    return doesntThrowAsync(UserController.getById, [id]);
  }
}
