import { userModel } from '../user/user.model';
import { folderModel } from '../folder/folder.model';

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

export function createFolders(numFolders: number) {
  const testFolders = [];
  for (let i = 0; i < numFolders; i++) {
    const folder = new folderModel({
      name: 'FN_' + (10 * numFolders + i),
      parent: 'FP_' + (10 * numFolders + i - 1),
      files: [],
      folders: [],
    });
    testFolders.push(folder);
  }
  return testFolders;
}
