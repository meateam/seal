import { IUser } from './user.interface';
import * as chai from 'chai';
import * as mocha from 'mocha';
import * as mongoose from 'mongoose';
import { UserManager } from './user.manager';
import { userModel } from './user.model';
import * as expect from 'expect';

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
  const user = {
    ID: '000' + i,
    uniqueID: 'uID' + i,
    creationDate: new Date(),
    heirarchy: 'Aman/Sapir/MadorHaim/' + i,
    name: 'User' + i,
    rootFolder: '/Path/To/Root/Folder' + i,
  };

  testUsers.push(user);
}

console.log(testUsers);
describe('Test Users', () => {

  before(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.database);
  });

  it('Drop the collection', async () => {
    mongoose.connection.once('connected', async () => {
      console.log('dropping collection!');
      mongoose.connection.db.dropCollection('users');
      // console.log(await UserManager.addUser(new userModel(testUsers[0])));
      const result = await UserManager.getUserById(testUsers[0].ID);
      // console.log(result);
      expect(result).to.not.exist;
      // console.log('getUser');
    });

  });

  // it('check if user db is empty', async () => {
  //   const result = await UserManager.getAllUsers();
  //   expect(result).to.be.empty;
  // });

  after((done) => {
    // console.log('done! ' + done);
    mongoose.disconnect();
    done();
  });

});
