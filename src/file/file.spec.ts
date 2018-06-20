import * as chaiHttp from 'chai-http';
import { IFile } from './file.interface';
import * as mongoose from 'mongoose';
import { expect } from 'chai';
import { server } from '../server';

const chai = require('chai');
chai.use(chaiHttp);

const config = {
  host: 'http://localhost:3000',
};

// const newName: string = 'Mr. Nobody';
// const TOTAL_USERS: number = 30;
// const testFiles: IFile[] = createJsonUsers(TOTAL_USERS);
// let tempUser: IUser;
let listener;

describe('Router', () => {
  before(() => {
    listener = server.listener;
  });

  after((done) => {
    listener.close();
    done();
  });

  // describe('Get all Files', () => {
  //   it('should return an empty collection', async () => {
  //     const allUsers: IFile[] = await fileController.getFiles();
  //     expect(allUsers).to.be.empty;
  //   });
  // });

  describe(`POST new file`, () => {
    it(`Should add a file`, (done) => {
      chai.request(config.host)
        .post('/api/upload')
        .set('content-type', 'application/x-www-form-urlencoded')
        .attach('files', 'test/test.html')
        .end((err, res) => {
          res.should.have.status(200); // 'success' status
          done();
        });
    });
  });

//   describe('Add files', () => {
//     it(`should add ${TOTAL_USERS} new users to the collection`, async () => {
//       for (let i = 0; i < testUsers.length; i++) {
//         await UserController.add(testUsers[i]);
//       }
//       const usersReturned = await fileController.getAll();
//       expect(usersReturned).to.not.be.empty;
//       expect(usersReturned).to.have.lengthOf(testUsers.length);
//     });
//   });

//   describe('deleteById', () => {
//     it('should delete a single user', async () => {
//       await fileController.deleteById(testUsers[0]._id);
//       const result: IUser = await fileController.getById(testUsers[0]._id);
//       const usersReturned: IUser[] = await fileController.getAll();
//       numberOfUsers--;
//       testUsers.shift();
//       expect(result).to.not.exist;
//       expect(usersReturned).to.have.lengthOf(numberOfUsers);
//     });
//   });

//   describe('update', () => {
//     it(`should update half (${Math.floor(testUsers.length / 2)}) of the names`, async () => {
//       for (let i = 0; i < Math.floor(testUsers.length / 2); i++) {
//         await fileController
//           .update(testUsers[i]._id, { name: newName });
//       }
//       const updatedUser: IUser = await fileController.getById(testUsers[0]._id);
//       expect(updatedUser.name).to.be.equal(newName);
//     });
//   });

//   describe('getByName', () => {
//     it('should get all users with the same name', async () => {
//       const users: IUser[] = await UserController.getByName(newName);
//       users.sort(sortUserBy_id);
//       expect(users.length).to.be.equal(Math.floor(testUsers.length / 2));
//       for (let i = 0; i < users.length; i++) {
//         expect(users[i].name).to.be.equal(newName);
//         expect(users[i]._id).to.be.equal(testUsers[i]._id);
//       }
//     });
//   });

//   describe('deleteAll', () => {
//     it('should delete all users from the collection', async () => {
//       await UserController.deleteAll();
//       const result2: IUser[] = await UserController.getAll();
//       expect(result2).to.be.empty;
//     });
//   });
});
