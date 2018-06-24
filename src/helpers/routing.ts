import { userRouter } from '../user/user.router';
import { fileRouter } from '../file/file.router';

export function initRouting(app) {
  app.use('/api/file', fileRouter);
  app.use('/api/user', userRouter);
  app.get('/', (req, res) => {
    res.send('Main page of the application');
  });

}
