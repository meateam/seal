import { Router, Request, Response, NextFunction } from 'express';

import warpAsync from '../helpers/warpAsync';
import { ShareResponder } from './share.responder';

const route = Router();

route.get('/', warpAsync(ShareResponder.get));
route.get('/:id', warpAsync(ShareResponder.getByID));
route.post('/:id', warpAsync(ShareResponder.create));
route.put('/:id', warpAsync(ShareResponder.update));
route.delete('/:id', warpAsync(ShareResponder.delete));

export default route;
