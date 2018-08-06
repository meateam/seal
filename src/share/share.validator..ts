import Validator from '../validator';
import shareController from './share.controller';
import { doesntThrowAsync } from '../helpers/functions';

export default class UserValidator extends Validator {
  async shareExists(id): Promise<boolean> {
    return doesntThrowAsync(shareController.getById, [id]);
  }
  // Temporarily here
  async fileExists(id): Promise<boolean> {
    return true; // TODO: move to file
  }
}
