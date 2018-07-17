import { userRouter } from './user/user.router';

export function initRouter(app) {
  app.use('/api/user', userRouter);
  app.get('/', (req, res) => {
    res.send('Main page of the application');
  });

}
