
export function createUsers(numUsers: number) {
  const testUsers = [];
  for (let i = 0; i < numUsers; i++) {
    const user = {
      _id: 'ID' + i,
      uniqueID: 'uID' + i,
      creationDate: new Date(),
      heirarchy: 'Aman/Sapir/MadorHaim/' + i,
      name: 'User' + i,
      rootFolder: '/Path/To/Root/Folder' + i,
    };
    testUsers.push(user);
  }
  return testUsers;
}
