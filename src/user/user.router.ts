/**
 * Routes the REST API to the responder which takes care of the extraction of the parameters.
 */
import { Router } from 'express';
import warpAsync from '../helpers/warpAsync';
import { UserResponder } from './user.responder';

export const userRouter: Router = Router();

userRouter.get('/', warpAsync(UserResponder.getAll));
userRouter.post('/', warpAsync(UserResponder.add));
userRouter.get('/:id', warpAsync(UserResponder.getById));
userRouter.put('/:id', warpAsync(UserResponder.update));
userRouter.delete('/:id', warpAsync(UserResponder.delete));
