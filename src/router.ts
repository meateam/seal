import { userRouter } from './user/user.router';
import { folderRouter } from './folder/folder.router';
import { ClientError, ServerError } from './errors/application';

export function initRouter(app) {
  app.use('/api/user', userRouter);
  app.use('/api/folder', folderRouter);
  app.get('/', (req, res) => {
    res.send('Main page of the application');
  });

  app.use((error, req, res, next) => {
    if (error instanceof ClientError || error instanceof ServerError) {
      return res.status(error.status).send(error.message + '');
    }
    next(error);
  });

  app.use((error, req, res, next) => {
    return res.status(600).json({
      type: 'GENERAL ERROR',
      message: error.message
    });

  });
}
