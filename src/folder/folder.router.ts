import { Router } from 'express';
import { FolderResponder } from './folder.responder';
import warpAsync from '../helpers/warpAsync';

export const folderRouter: Router = Router();

folderRouter.get('/:id', warpAsync(FolderResponder.getById));
folderRouter.get('/', warpAsync(FolderResponder.getAll));
folderRouter.post('/', warpAsync(FolderResponder.add));
folderRouter.put('/:id', warpAsync(FolderResponder.update));
folderRouter.delete('/:id', warpAsync(FolderResponder.delete));
