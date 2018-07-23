import { Router, Request, Response } from 'express';
import { controllerHandler } from '../helpers/controller.helper';
import { FolderController } from './folder.controller';
export const folderRouter: Router = Router();
const controller = new FolderController();

folderRouter.get('/:id', async (req: Request, res: Response) => {
  controllerHandler(controller.getById, () => [req.params.id])(req, res, null);
});

folderRouter.get('/', async (req: Request, res: Response) => {
  controllerHandler(controller.getAll, null)(req, res, null);
});

folderRouter.post('/', async (req: Request, res: Response) => {
  controllerHandler(controller.add, () => [req.body])(req, res, null);
});

folderRouter.put('/:id', async (req: Request, res: Response) => {
  controllerHandler(controller.update, () => [req.params.id, req.body])(req, res, null);
});

folderRouter.delete('/:id', async (req: Request, res: Response) => {
  controllerHandler(controller.deleteById, () => [req.params.id])(req, res, null);
});
