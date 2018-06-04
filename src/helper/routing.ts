import { routeEnum } from './ENUMS';
import { userRouter } from '../user/user.router';

export function initRouting(app) {
  app.use(routeEnum.USERS, userRouter);

  app.get('/', (req, res) => {
    res.send('Invalid page');
  });
}
