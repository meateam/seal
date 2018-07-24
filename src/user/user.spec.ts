/**
 * Test on the user controller.
 */
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as UserErrors from '../errors/user';
import { createUsers } from '../helpers/functions';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import { ServerError } from '../errors/application';

const expect: Chai.ExpectStatic = chai.expect;
chai.use(chaiAsPromised);

const TOTAL_USERS: number = 4;
const newName: string = 'shamanTheKing';
const testUsers: IUser[] = createUsers(TOTAL_USERS);
const controller = new UserController();

describe(`User logic`, () => {

  beforeEach('User BeforeEach', async () => {
    await userModel.remove({}, (err) => { });
    await Promise.all(testUsers.map(user => controller.add(user)));

  });

  describe('#getByName', () => {
    it('should get all users with the same name', async () => {
      for (let i: number = 0; i < Math.floor(testUsers.length / 2); i++) {
        await controller.update(testUsers[i]._id, { _id: testUsers[i]._id, name: newName });
      }
      const users: IUser[] = await controller.getByName(newName);
      users.sort(sortUserBy_id);
      expect(users.length).to.be.equal(Math.floor(testUsers.length / 2));
      for (let i: number = 0; i < users.length; i++) {
        expect(users[i].name).to.be.equal(newName);
        expect(users[i]._id).to.be.equal(testUsers[i]._id);
      }
    });
  });

});

function sortUserBy_id(user1: IUser, user2: IUser): number {
  if (user1._id > user2._id) {
    return 1;
  }
  if (user1._id < user2._id) {
    return -1;
  }

  return 0;
}
