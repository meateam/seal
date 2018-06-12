import { IUser } from './user.interface';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { UserController } from './user.controller';
import { userModel } from './user.model';

const testUsers: IUser[] = [];
const config = {
  database: 'mongodb://localhost:27017/testing',
};

let numberOfUsers: number = 7;

for (let i = 0; i < numberOfUsers; i++) {
  const user = new userModel({
    _id: '100' + i,
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
  mongoose.connect(config.database);
});

describe('Test Users', () => {

  it('Delete all users from the collection', async () => {
    await UserController.deleteAllUsers();
    const result2 = await UserController.getAllUsers();
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
    const result = await UserController.getUserById(testUsers[0]._id);
    const usersReturned = await UserController.getAllUsers();
    numberOfUsers--;
    expect(result).to.not.exist;
    expect(usersReturned).to.have.lengthOf(numberOfUsers);
  });

  it('Update user', async () => {
    await UserController.updateUser(testUsers[1]._id, { name: testUsers[2].name });
    const updatedUser = await UserController.getUserById(testUsers[1]._id);
    expect(updatedUser.name).to.be.equal(testUsers[2].name);
  });

  it('Get all users by name', async () => {
    const users = await UserController.getUsersByName(testUsers[2].name);
    for (let i = 0; i < users.length; i++) {
      expect(users[i].name).to.be.equal(testUsers[2].name);
    }
    expect(users[0]._id).to.be.equal(testUsers[1]._id);
    expect(users[1]._id).to.be.equal(testUsers[2]._id);
    expect(users.length).to.be.equal(2);
  });

  it.skip('Delete all users from the collection', async () => {
    await UserController.deleteAllUsers();
    const result2 = await UserController.getAllUsers();
    expect(result2).to.be.empty;
  });

});

after((done) => {
  mongoose.disconnect();
  done();
});
