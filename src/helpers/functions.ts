import { userModel } from '../user/user.model';
import { IUser } from '../user/user.interface';

export function createJsonUsers(numUsers: number) {
  const testUsers = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      _id: 'ID' + i,
      uniqueID: 'uID' + i,
      creationDate: new Date(),
      hierarchy: 'Aman/Sapir/MadorHaim/' + i,
      name: 'User' + i,
      rootFolder: '/Path/To/Root/Folder' + i,
    };
    testUsers.push(user);
  }
  return testUsers;
}

export function createUsers(numUsers: number) {
  const testUsers = [];
  for (let i = 0; i < numUsers; i++) {
    const user = new userModel({
      _id: 10 * numUsers + i,
      uniqueID: 'uID' + i,
      creationDate: new Date(),
      hierarchy: 'Aman/Sapir/MadorHaim/' + i,
      name: 'User' + i,
      rootFolder: '/Path/To/Root/Folder' + i,
    });
    testUsers.push(user);
  }
  return testUsers;
}
