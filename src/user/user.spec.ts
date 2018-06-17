import { IUser } from './user.interface';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { UserController } from './user.controller';
import { userModel } from './user.model';
import { config } from '../config';

const testUsers: IUser[] = [];
const TOTAL_USERS: number = 10000;
const newName: string = 'shaharTheKing';

let numberOfUsers = TOTAL_USERS;
for (let i = 0; i < TOTAL_USERS; i++) {
  const user = new userModel({
    _id: 10 * TOTAL_USERS + i,
    uniqueID: 'uID' + i,
    creationDate: new Date(),
    heirarchy: 'Aman/Sapir/MadorHaim/' + i,
    name: 'User' + i,
    rootFolder: '/Path/To/Root/Folder' + i,
  });

  testUsers.push(user);
}

before(() => {
  (<any>mongoose).Promise = global.Promise;
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
});

describe(`Test Users with ${TOTAL_USERS} users`, () => {

  it('Delete all users from the collection', async () => {
    await UserController.deleteAllUsers();
    const result2: IUser[] = await UserController.getAllUsers();
    console.log(result2);
    expect(result2).to.be.empty;

  });

  it('Add users to the collection', async () => {
    for (let i = 0; i < testUsers.length; i++) {
      await UserController.addUser(testUsers[i]);
    }
    const usersReturned = await UserController.getAllUsers();
    expect(usersReturned).to.not.be.empty;
    expect(usersReturned).to.have.lengthOf(testUsers.length);
  });

  it('Delete a single user', async () => {
    await UserController.deleteUserById(testUsers[0]._id);
    const result: IUser = await UserController.getUserById(testUsers[0]._id);
    const usersReturned: IUser[] = await UserController.getAllUsers();
    numberOfUsers--;
    testUsers.shift();
    expect(result).to.not.exist;
    expect(usersReturned).to.have.lengthOf(numberOfUsers);
  });

  it(`Update half (${Math.floor(testUsers.length / 2)}) of the names to ${newName}`, async () => {

    for (let i = 0; i < Math.floor(testUsers.length / 2); i++) {
      await UserController
        .updateUser(testUsers[i]._id, { name: newName });
    }
    const updatedUser: IUser = await UserController.getUserById(testUsers[0]._id);
    expect(updatedUser.name).to.be.equal(newName);
  });

  it('Get all users by name', async () => {
    const users: IUser[] = await UserController.getUsersByName(newName);
    users.sort(sortUserBy_id);
    expect(users.length).to.be.equal(Math.floor(testUsers.length / 2));
    for (let i = 0; i < users.length; i++) {
      expect(users[i].name).to.be.equal(newName);
      expect(users[i]._id).to.be.equal(testUsers[i]._id);
    }
  });

  it.skip('Delete all users from the collection', async () => {
    await UserController.deleteAllUsers();
    const result2: IUser[] = await UserController.getAllUsers();
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
