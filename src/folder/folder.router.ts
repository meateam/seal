import { Router, Request, Response } from 'express';
import { controllerHandler } from '../helpers/controller.helper';
export const folderRouter : Router = Router();

folderRouter.get('/', async (req : Request, res : Response) => {
    // controllerHandler()
});
