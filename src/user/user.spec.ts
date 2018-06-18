import { IUser } from './user.interface';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { UserController } from './user.controller';
import { createUsers } from '../helper/functions';
import { userModel } from './user.model';
import { config } from '../config';

const TOTAL_USERS: number = 10000;
const testUsers: IUser[] = createUsers(TOTAL_USERS);
const newName: string = 'shaharTheKing';

let numberOfUsers = TOTAL_USERS;

before(() => {
  (<any>mongoose).Promise = global.Promise;
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
});

describe(`Test Users with ${TOTAL_USERS} users`, () => {
  it('Delete all users from the collection', async () => {
    await UserController.deleteAll();
    const result2: IUser[] = await UserController.getAll();
    console.log(result2);
    expect(result2).to.be.empty;

  });

  it('Add users to the collection', async () => {
    for (let i = 0; i < testUsers.length; i++) {
      await UserController.add(testUsers[i]);
    }
    const usersReturned = await UserController.getAll();
    expect(usersReturned).to.not.be.empty;
    expect(usersReturned).to.have.lengthOf(testUsers.length);
  });

  it('Delete a single user', async () => {
    await UserController.deleteById(testUsers[0]._id);
    const result: IUser = await UserController.getById(testUsers[0]._id);
    const usersReturned: IUser[] = await UserController.getAll();
    numberOfUsers--;
    testUsers.shift();
    expect(result).to.not.exist;
    expect(usersReturned).to.have.lengthOf(numberOfUsers);
  });

  it(`Update half (${Math.floor(testUsers.length / 2)}) of the names to ${newName}`, async () => {

    for (let i = 0; i < Math.floor(testUsers.length / 2); i++) {
      await UserController
        .update(testUsers[i]._id, { name: newName });
    }
    const updatedUser: IUser = await UserController.getById(testUsers[0]._id);
    expect(updatedUser.name).to.be.equal(newName);
  });

  it('Get all users by name', async () => {
    const users: IUser[] = await UserController.getByName(newName);
    users.sort(sortUserBy_id);
    expect(users.length).to.be.equal(Math.floor(testUsers.length / 2));
    for (let i = 0; i < users.length; i++) {
      expect(users[i].name).to.be.equal(newName);
      expect(users[i]._id).to.be.equal(testUsers[i]._id);
    }
  });

  it.skip('Delete all users from the collection', async () => {
    await UserController.deleteAll();
    const result2: IUser[] = await UserController.getAll();
    expect(result2).to.be.empty;
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
