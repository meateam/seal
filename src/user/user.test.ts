import { IUser } from './user.interface';
import * as chai from 'chai';
import * as mocha from 'mocha';
import * as mongoose from 'mongoose';
import { UserManager } from './user.manager';
import { userModel } from './user.model';
import * as expect from 'expect';
import * as bluebird from 'bluebird';

const testUsers: IUser[] = [];
const config = {
  database: 'mongodb://localhost:27017/testing',
};
console.log(testUsers);
// testUsers[0] = {
//   ID : '000' + 0,
//   uniqueID : 'uID' + 0,
//   creationDate : new Date(),
//   heirarchy : 'Aman/Sapir/MadorHaim/' + 0,
//   name : 'User' + 0,
//   Root_Folder : '/Path/To/Root/Folder' + 0,
// };
for (let i = 0; i < 4; i += 1) {
  const user = new userModel({
    ID: '000' + i,
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

console.log(testUsers);
describe('Test Users', () => {

  it('Delete all users from the collection', () => {
    mongoose.connection.once('connected', async () => {
      // console.log(await UserManager.addUser(new userModel(testUsers[0])));
      const result1 = await UserManager.deleteAllUsers();
      const result2 = await UserManager.getAllUsers();
      // console.log(result);
      expect(result2).to.be.empty;
      // console.log('getUser');
    });
  });


  it('add users to the collection', async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // await UserManager.addUser(testUsers[i]);
    }
    await UserManager.addUser(testUsers[0]);
    // const usersReturned = await UserManager.getAllUsers();
    // expect(usersReturned).to.not.be.empty;
    // expect(usersReturned).to.have.lengthOf(testUsers.length);
  });

});
after((done) => {
  // console.log('done! ' + done);
  // console.log(mongoose.disconnect());
  mongoose.disconnect();
  done();
});
