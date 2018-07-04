import { EntityTypes } from '../helpers/enums';

type EntityConfig = {
  type: EntityTypes;
  port: number;
  db: {
    host: string;
    port: string;
    name: string;
  };
};
