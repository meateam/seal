import { IFolder } from './folder.interface';

export class FolderValidator {
  public static compareFolders(folder1: IFolder, folder2: IFolder): boolean {
    return (
      String(folder1._id) === String(folder2._id) &&
      String(folder1.name) === String(folder2.name) &&
      String(folder1.parent) === String(folder2.parent) &&
      this.compareArrays(folder1.files, folder2.files) &&
      this.compareArrays(folder1.folders, folder2.folders) &&
      String(folder1.owner) === String(folder2.owner)
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
    return (array1.length === array2.length && array1.every((v, i) => { return String(v) === String(array2[i]); }));
  }
}
