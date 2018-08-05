/**
 * Helper functions for the tests
 */
import { IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { folderModel } from '../folder/folder.model';
import { IFolder } from '../folder/folder.interface';

export function createJsonUsers(numUsers: number): IUser[] {
  const rand2: string = Math.random().toString(36).substring(2, 7);
  const testUsers: IUser[] = [];
  for (let i: number = 0; i < numUsers; i++) {
    const user: any = {
      uniqueID: rand2 + '_' + (numUsers * 10 + i),
      hierarchy: 'Aman/Sapir/MadorHaim/' + i,
      name: 'User' + i,
      rootFolder: '/Path/To/Root/Folder' + i
    };
    testUsers.push(user);
  }

  return testUsers;
}

// Create Random users using random strings
export function createUsers(numUsers: number): IUser[] {
  const rand2: string = Math.random().toString(36).substring(2, 7);
  const testUsers: IUser[] = [];
  for (let i: number = 0; i < numUsers; i++) {
    const user: IUser = new UserModel({
      uniqueID: rand2 + '_' + (numUsers * 10 + i),
      hierarchy: 'Aman/Sapir/MadorHaim/' + i,
      name: 'User' + i,
      rootFolder: '/Path/To/Root/Folder' + i
    });
    testUsers.push(user);
  }

  return testUsers;
}

export function createFolders(numFolders: number) {
  const testFolders: IFolder[] = [];
  for (let i = 0; i < numFolders; i++) {
    const folder = new folderModel({
      name: 'FN_' + (10 * numFolders + i),
      owner: 'UserName',
      parent: 'FP_' + (10 * numFolders + i - 1),
      files: [],
      folders: [],
    });
    testFolders.push(folder);
  }
  return testFolders;
}

export async function doesntThrowAsync(func, args): Promise<boolean> {
  try {
    await func(...args);
    return true;
  } catch {
    return false;
  }

}
