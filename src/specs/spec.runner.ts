import { runTests } from './spec.controller';
import { UserController } from '../user/user.controller';
import { FolderController } from '../folder/folder.controller';

runTests(new UserController);
runTests(new FolderController);
