/**
 * Helper functions for the tests
 */
import { IUser } from '../user/user.interface';
import { userModel } from '../user/user.model';
import { fileModel } from '../file/file.model';
import * as fs from 'fs-extra';
import { config } from '../config';
import { folderModel } from '../folder/folder.model';
import { IFolder } from '../folder/folder.interface';

export function createJsonUsers(numUsers: number): IUser[] {
  const rand1: string = Math.random().toString(36).substring(2, 7);
  const rand2: string = Math.random().toString(36).substring(2, 7);
  const testUsers: IUser[] = [];
  for (let i: number = 0; i < numUsers; i++) {
    const user: any = {
      _id: rand1 + '_' + (numUsers * 10 + i),
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
  const rand1: string = Math.random().toString(36).substring(2, 7);
  const rand2: string = Math.random().toString(36).substring(2, 7);
  const testUsers: IUser[] = [];
  for (let i: number = 0; i < numUsers; i++) {
    const user: IUser = new userModel({
      _id: rand1 + '_' + (numUsers * 10 + i),
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
  const folderName = `${config.storage}`;
  fs.ensureDir(folderName, (err) => {
    if (err) throw err;
  });
  const testFiles = [];
  for (let i = 0; i < numFiles; i = i + 1) {
    const currName = 'test-' + i + '.txt';
    const file = new fileModel({
      fileName: currName,
      fileSize: 10 * i,
      path: folderName + '/' + currName,
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
  const filepath = `${config.storage}/` + fileName;

  fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    // console.log('The file was succesfully saved!');
  });
}

async function createFolder(directory) {
  try {
    await fs.ensureDir(directory);
    console.log('success!');
  } catch (err) {
    console.error(err);
  }
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
