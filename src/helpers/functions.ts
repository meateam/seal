import { userModel } from '../user/user.model';
import { fileModel } from '../file/file.model';

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

export function createFiles(numFiles: number) {
  const testFiles = [];
  for (let i = 0; i < numFiles; i = i + 1) {
    const file = new fileModel({
      fileName: 'test-' + i,
      fileSize: 10 * i,
      path: 'uploadsTEST\\' + 'test-' + i,
      fileType: 'txt',
      createdAt: Date.now(),
      Owner: 'Owner',
      Parent: 'Parent',
    });
    testFiles.push(file);
  }
  return testFiles;
}
