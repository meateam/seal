/**
 * Test on the user controller.
 */
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as UserErrors from '../errors/user';
import * as mongoose from 'mongoose';
import { config } from '../config';
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

describe(`User Logic`, () => {

  beforeEach(async () => {
    await userModel.remove({}, (err) => { });
    await Promise.all(testUsers.map(user => controller.add(user)));

  });

  describe('#getById', () => {
    it('should return a user by its id', async () => {
      const user: IUser = await controller.getById(testUsers[0]._id);
      expect(testUsers[0].equals(user)).to.be.true;
    });
  });

  describe('#getAll', () => {
    it(`should return a collection with ${TOTAL_USERS} users`, async () => {
      const usersReturned: IUser[] = await controller.getAll();
      expect(usersReturned).to.not.be.empty;
      expect(usersReturned).to.have.lengthOf(testUsers.length);
    });
  });

  describe('#add', () => {
    it('should add a new user to the collection', async () => {
      const user: IUser = createUsers(1)[0];
      await controller.add(user);
      const usersReturned: IUser[] = await controller.getAll();
      expect(usersReturned).to.not.be.empty;
      expect(usersReturned).to.have.lengthOf(testUsers.length + 1);
    });
    it('should throw exception when trying to add new user with existed id', async () => {
      try {
        await controller.add(testUsers[0]);
        expect(false).to.be.true;
      } catch (err) {
        expect(err).to.be.instanceof(ServerError);
      }
    });
  });

  describe('#deleteById', () => {
    it('should delete a single user', async () => {
      await controller.deleteById(testUsers[0]._id);
      const usersReturned: IUser[] = await controller.getAll();
      expect(usersReturned).to.have.lengthOf(TOTAL_USERS - 1);
    });
    it('should throw UserNotFoundError for trying to delete non-existent user', async () => {
      try {
        await controller.deleteById('non-existent user');
        expect(false).to.be.true;
      } catch (err) {
        expect(err).to.be.instanceof(UserErrors.UserNotFoundError);
      }
    });
  });

  describe('#update', () => {
    it('should update half of the names', async () => {
      for (let i: number = 0; i < Math.floor(testUsers.length / 2); i++) {
        await controller.update(testUsers[i]._id, { _id: testUsers[i]._id, name: newName });
      }
      const updatedUser: IUser = await controller.getById(testUsers[0]._id);
      expect(updatedUser.name).to.be.equal(newName);
    });
    it('should throw exception when trying to update a non-existent user', async () => {
      try {
        await controller.update('non_existent_id', { name: 'ErrorName' });
        expect(false).to.be.true;
      } catch (err) {
        expect(err).to.be.instanceof(UserErrors.UserNotFoundError);
      }

    });
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

  // after((done: any) => {
  //   mongoose.disconnect();
  //   done();
  // });

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
