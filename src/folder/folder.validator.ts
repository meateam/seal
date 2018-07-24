import { IFolder } from './folder.interface';

export class FolderValidator {
  public static compareFolders(folder1: IFolder, folder2: IFolder): boolean {
    return (
      (folder1._id + '' === folder2._id + '') &&
      folder1.name === folder2.name &&
      folder1.parent === folder2.parent &&
      this.compareArrays(folder1.files, folder2.files) &&
      this.compareArrays(folder1.folders, folder2.folders) &&
      folder1.owner === folder2.owner
    );
  }

  public static isValidMongoId(id: string) {
    const regEx = new RegExp('^[0-9a-fA-F]{24}$');
    return regEx.test(id);
  }

  public static isValidUpdate(id: string, partialFolder: Partial<IFolder>): boolean {
    if (partialFolder._id) {
      if (partialFolder._id === id && this.isValidMongoId(id) && this.isValidMongoId(partialFolder._id)) {
        return true;
      }
      return false;
    }

    return this.isValidMongoId(id);
  }

  private static compareArrays(array1, array2) {
    return (array1.length === array2.length && array1.every((v, i) => { return v === array2[i]; }));
  }
}
