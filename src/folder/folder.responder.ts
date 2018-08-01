import { FolderController } from './folder.controller';

const controller = new FolderController();

// TODO: Add validation here, and remove it from the controller.
export class FolderResponder {

  constructor() {}

  public static async getById(req, res) {
    return res.json(await controller.getById(req.params.id));
  }

  public static async getAll(req, res) {
    return res.json(await controller.getAll());
  }

  public static async update(req, res) {
    return res.json(await controller.update(req.params.id, req.body));
  }

  public static async delete(req, res) {
    return res.json(await controller.deleteById(req.params.id));
  }

  public static async add(req, res) {
    return res.json(await controller.add(req.body));
  }
}
