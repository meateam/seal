/**
 * Helper functions for the tests
 */
import { IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { fileModel } from '../file/file.model';
import * as fs from 'fs-extra';
import { config } from '../config';
import { FolderModel } from '../folder/folder.model';
import { IFolder } from '../folder/folder.interface';
import * as mongoose from 'mongoose';

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

export function createFiles(numFiles: number) {
  const folderName = './uploadsTEST';
  fs.ensureDir(folderName, (err) => {
    if (err) throw err;
  });
  const testFiles = [];
  for (let i = 0; i < numFiles; i = i + 1) {
    const currName = 'test-' + i + '.txt';
    const file = new fileModel({
      fileName: currName,
      fileSize: 10 * i,
      path: folderName + '//' + currName,
      fileType: 'txt',
      createdAt: Date.now(),
      Owner: 'Owner',
      Parent: 'Parent',
    });
    testFiles.push(file);
    createFile(file.fileName);
  }
  return testFiles;
}

function createFile(fileName: string) {
  // Change the content of the file as you want
  const fileContent = 'Hello World!';

  // The absolute path of the new file with its name
  const filePath = './uploadsTEST/' + fileName;

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
  });
}

async function createFolder(directory) {
  try {
    await fs.ensureDir(directory);
  } catch (err) {
    console.error(err);
  }
}

export function createFolders(numFolders: number) {
  const testFolders: IFolder[] = [];
  for (let i = 0; i < numFolders; i++) {
    const folder = new FolderModel({
      name: 'FN_' + (10 * numFolders + i),
      owner: mongoose.Types.ObjectId(),
      parent: mongoose.Types.ObjectId(),
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
