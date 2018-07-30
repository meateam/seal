import { UserController } from './user.controller';

export class UserResponder {
  public static async getById(req, res) {
    console.log('UserResponder ' + req.params.id);
    const controller = new UserController();
    return res.json(await controller.getById(req.params.id));
  }
}
