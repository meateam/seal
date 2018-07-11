import { Request, Response } from 'express';
import ShareController from './share.controller';

export class ShareResponder {
  static async get(req: Request, res: Response) {
    let result = undefined;
    const query = req.query;
    if (query) {
      // TODO: Validate the query here
      result = await ShareController.getAll();
    } else {
      result = await ShareController.getAll();
    }
    res.json(result);
  }
  static async getByID(req: Request, res: Response) {
    res.json({});
  }
  static async create(req: Request, res: Response) {
    res.json({});
  }
  static async update(req: Request, res: Response) {
    res.json({});
  }
  static async delete(req: Request, res: Response) {
    res.json({});
  }
}
