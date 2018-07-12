import { EntityTypes } from '../helpers/enums';
import { UserController } from '../user/user.controller';
import { createUsers } from '../helpers/functions';

export type EntityConfig = {
  type: EntityTypes;
  controller: any;
  creator: any;
};

export const user_entity : EntityConfig = {
  type: EntityTypes.USER,
  controller: UserController,
  creator: createUsers,
};
