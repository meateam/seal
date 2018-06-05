import * as express from 'express';
import { fileController } from './file.controller'

export let fileRouter: express.Router = express.Router();

fileRouter.post('/upload', fileController.create);
fileRouter.get('/list', fileController.list);
fileRouter.delete('/delete/:id', fileController.delete);
