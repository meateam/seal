import { IUser } from './user.interface';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { UserManager } from './user.manager';
import { userModel } from './user.model';

const testUsers: IUser[] = [];
const config = {
  database: 'mongodb://localhost:27017/testing',
};
// console.log(testUsers);
let numberOfUsers: number = 5;

for (let i = 0; i < numberOfUsers; i++) {
  const user = new userModel({
    ID: '100' + i,
    uniqueID: 'uID' + i,
    creationDate: new Date(),
    heirarchy: 'Aman/Sapir/MadorHaim/' + i,
    name: 'User' + i,
    rootFolder: '/Path/To/Root/Folder' + i,
  });

  testUsers.push(user);
}
// console.log('testUsers:' + testUsers);

before(() => {
  (<any>mongoose).Promise = global.Promise;
  mongoose.connect(config.database);
});

// console.log(testUsers);
describe('Test Users', () => {

  it('Delete all users from the collection', async () => {
    mongoose.connection.once('connected', () => { });

    await UserManager.deleteAllUsers();
    const result2 = await UserManager.getAllUsers();
    expect(result2).to.be.empty;

  });

  it('Add users to the collection', async () => {
    for (let i = 0; i < testUsers.length; i++) {
      await UserManager.addUser(testUsers[i]);
    }
    const usersReturned = await UserManager.getAllUsers();
    expect(usersReturned).to.not.be.empty;
    expect(usersReturned).to.have.lengthOf(testUsers.length);
  });

  it('Delete a single user', async () => {
    await UserManager.deleteUserById(testUsers[0].ID);
    const result = await UserManager.getUserById(testUsers[0].ID);
    const usersReturned = await UserManager.getAllUsers();
    numberOfUsers--;
    expect(result).to.not.exist;
    expect(usersReturned).to.have.lengthOf(numberOfUsers);
  });

  it('Update user', async () => {
    await UserManager.updateUser(testUsers[1].ID, { name: testUsers[2].name });
    const updatedUser = await UserManager.getUserById(testUsers[1].ID);
    expect(updatedUser.name).to.be.equal(testUsers[2].name);
  });

  it('Get all users by name', async () => {
    const users = await UserManager.getUsersByName(testUsers[2].name);
    for(let i = 0; i < users.length; i++){
      expect(users[i].name).to.be.equal(testUsers[2].name);
    }
    expect(users[0].ID).to.be.equal(testUsers[1].ID);
    expect(users[1].ID).to.be.equal(testUsers[2].ID);
    expect(users.length).to.be.equal(2);
  });

});

after((done) => {
  mongoose.disconnect();
  done();
});
