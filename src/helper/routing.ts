import { routeEnum } from './ENUMS';
import { userRouter } from '../user/user.router';
const api = "/api";
export function initRouting(app) {

  app.use(api + routeEnum.USERS, userRouter);

  app.get('/', (req, res) => {
    res.send('Main page of the application');
  });

}
