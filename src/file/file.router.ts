import * as express from 'express';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';
import { upload } from './storage/storage.manager';
import warpAsync from '../helpers/warpAsync';
import { FileResponder } from './file.responder';

export let fileRouter: express.Router = express.Router();

fileRouter.post('/upload', upload, warpAsync(FileResponder.create));
fileRouter.get('/', warpAsync(FileResponder.getAll));
fileRouter.delete('/:id', warpAsync(FileResponder.delete));
fileRouter.get('/:fieldValue', warpAsync(FileResponder.get));
fileRouter.put('/:id' , warpAsync(FileResponder.update));
