import { runTests } from './spec.controller';
import { UserController } from '../user/user.controller';

runTests(new UserController);
