import * as express from 'express';
import { upload } from './storage/storage.manager';
import warpAsync from '../helpers/warpAsync';
import { FileResponder } from './file.responder';

export let fileRouter: express.Router = express.Router();

fileRouter.post('/upload', upload, warpAsync(FileResponder.create));
fileRouter.get('/', warpAsync(FileResponder.getAll));
fileRouter.delete('/:id', warpAsync(FileResponder.delete));
fileRouter.get('/metadata', warpAsync(FileResponder.get));
fileRouter.get('/:id', warpAsync(FileResponder.download));
fileRouter.put('/:id', warpAsync(FileResponder.update));
