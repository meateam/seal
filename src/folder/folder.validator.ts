import { IFolder } from './folder.interface';

export class FolderValidator {
  public static compareFolders(folder1: IFolder, folder2: IFolder): boolean {
    return (
      (folder1._id + '' === folder2._id + '') &&
      folder1.name === folder2.name &&
      folder1.parent === folder2.parent &&
      compareArrays(folder1.files, folder2.files) &&
      compareArrays(folder1.folders, folder2.folders) &&
      folder1.owner === folder2.owner
    );
  }
}

function compareArrays(array1, array2) {
  return (array1.length === array2.length && array1.every((v, i) => { return v === array2[i]; }));
}
