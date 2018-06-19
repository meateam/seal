import { IUser } from './user.interface';
import * as chai from 'chai';
import * as mongoose from 'mongoose';
import { UserController } from './user.controller';
import { createUsers } from '../helper/functions';
import { userModel } from './user.model';
import { config } from '../config';

const expect = chai.expect;
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

const TOTAL_USERS: number = 10;
const testUsers: IUser[] = createUsers(TOTAL_USERS);
const newName: string = 'shaharTheKing';

let numberOfUsers = TOTAL_USERS;

before(() => {
  (<any>mongoose).Promise = global.Promise;
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
  userModel.remove({}, (err) => { });
});

describe(`Test Users with ${TOTAL_USERS} users`, () => {

  describe('#getAll', () => {
    it('should return an empty collection', async () => {
      const allUsers: IUser[] = await UserController.getAll();
      expect(allUsers).to.be.empty;
    });
  });

  describe('#add', () => {
    it(`should add ${TOTAL_USERS} new users to the collection`, async () => {
      await Promise.all(testUsers.map(user => UserController.add(user)));
      const usersReturned = await UserController.getAll();
      expect(usersReturned).to.not.be.empty;
      expect(usersReturned).to.have.lengthOf(testUsers.length);
    });
  });

  describe('#deleteById', () => {
    it('should delete a single user', async () => {
      await UserController.deleteById(testUsers[0]._id);
      expect(UserController.getById(testUsers[0]._id))
        .to.eventually.be.rejectedWith('User does not exist');
      const usersReturned: IUser[] = await UserController.getAll();
      numberOfUsers--;
      testUsers.shift();
      expect(usersReturned).to.have.lengthOf(numberOfUsers);
    });
  });

  describe('#update', () => {
    it(`should update half (${Math.floor(testUsers.length / 2)}) of the names`, async () => {
      for (let i = 0; i < Math.floor(testUsers.length / 2); i++) {
        await UserController.update(testUsers[i]._id, { _id: testUsers[i]._id, name: newName });
      }
      const updatedUser: IUser = await UserController.getById(testUsers[0]._id);
      expect(updatedUser.name).to.be.equal(newName);
    });
  });

  describe('#getByName', () => {
    it('should get all users with the same name', async () => {
      const users: IUser[] = await UserController.getByName(newName);
      users.sort(sortUserBy_id);
      expect(users.length).to.be.equal(Math.floor(testUsers.length / 2));
      for (let i = 0; i < users.length; i++) {
        expect(users[i].name).to.be.equal(newName);
        expect(users[i]._id).to.be.equal(testUsers[i]._id);
      }
    });
  });

  describe('#deleteAll', () => {
    it.skip('should delete all users from the collection', async () => {
      await UserController.deleteAll();
      const result2: IUser[] = await UserController.getAll();
      expect(result2).to.be.empty;
    });
  });

});

after((done) => {
  mongoose.disconnect();
  done();
});

function sortUserBy_id(user1: IUser, user2: IUser) {
  if (user1._id > user2._id) {
    return 1;
  }
  if (user1._id < user2._id) {
    return -1;
  }
  return 0;
}
