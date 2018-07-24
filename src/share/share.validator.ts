import Validator from '../validator';
import shareController from './share.controller';
import { doesntThrowAsync } from '../helpers/functions';
import IShare from './share.interface';

export default class ShareValidator extends Validator {
  static async shareExists(id): Promise<boolean> {
    return doesntThrowAsync(shareController.getById, [id]);
  }
  // Temporarily here
  static async fileExists(id): Promise<boolean> {
    return true; // TODO: move to file
  }

  // static async isValid(share:IShare): Promise<boolean> {
  //   if (!UserValidator.userExists(share.from)) {
  //     throw new UserNotFoundError('The user ' + share.from + ' who shared, is not found');
  //   }
  //   if (!UserValidator.userExists(share.to)) {
  //     throw new UserNotFoundError('The user ' + share.to + ' who is shared with, is not found');
  //   }
  //   if (!ShareValidator.fileExists(share.file)) {
  //     throw new UserNotFoundError('The user ' + share.to + ' who is shared with, is not found');
  //   }
  // }

  static async isValid(share: IShare): Promise<boolean> {
    return true;
  }
}

export class ShareMiddleware {
  static async validate(req, res, next) {

  }
}

// TODO (in user validator)
async function userExists(id): Promise<boolean> {
  return true;
}
