import { IUser } from './user.interface';
import * as chai from 'chai';
import * as mocha from 'mocha';
import * as mongoose from 'mongoose';
import { UserManager } from './user.manager';
import { userModel } from './user.model';
import * as bluebird from 'bluebird';

const expect = chai.expect;

const testUsers: IUser[] = [];
const config = {
  database: 'mongodb://localhost:27017/testing',
};
// console.log(testUsers);

for (let i = 0; i < 10; i += 1) {
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

    const result1 = await UserManager.deleteAllUsers();
    const result2 = await UserManager.getAllUsers();
    console.log('result2:*************');
    console.log(result2);
    expect(result2).to.be.empty;

  });

  it('add users to the collection', async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      console.log('adding ' + i);
      await UserManager.addUser(testUsers[i]);
    }
    // await UserManager.addUser(testUsers[0]);
    const usersReturned = await UserManager.getAllUsers();
    // console.log('usersReturned: ' + usersReturned);
    expect(usersReturned).to.not.be.empty;
    expect(usersReturned).to.have.lengthOf(testUsers.length);
  });

});

after((done) => {
  mongoose.disconnect();
  done();
});
