/**
 *
 */
import { IUser } from '../user/user.interface';
import { userModel } from '../user/user.model';

export function createJsonUsers(numUsers: number): IUser[] {
  const testUsers: IUser[] = [];
  for (let i: number = 0; i < numUsers; i++) {
    const user: any = {
      _id: 'ID' + i,
      uniqueID: 'uID' + i,
      creationDate: new Date(),
      hierarchy: 'Aman/Sapir/MadorHaim/' + i,
      name: 'User' + i,
      rootFolder: '/Path/To/Root/Folder' + i
    };
    testUsers.push(user);
  }

  return testUsers;
}

export function createUsers(numUsers: number): IUser[] {
  const testUsers: IUser[] = [];
  for (let i: number = 0; i < numUsers; i++) {
    const user: IUser = new userModel({
      _id: numUsers * 10 + i,
      uniqueID: 'uID' + i,
      creationDate: new Date(),
      hierarchy: 'Aman/Sapir/MadorHaim/' + i,
      name: 'User' + i,
      rootFolder: '/Path/To/Root/Folder' + i
    });
    testUsers.push(user);
  }

  return testUsers;
}
