/**
 * FolderService handles the calls to the database
 */

import { IFolder } from './folder.interface';
import { folderModel } from './folder.model';

export class FolderService {

  public static getById(id: String): Promise<IFolder> {
    return folderModel.findById(id).exec();
  }

  public static getByName(name: String): Promise<IFolder[]> {
    return folderModel.find({ name }).exec();
  }

  public static update(id: String, newFolder: Partial<IFolder>): Promise<IFolder> {
    return folderModel.findByIdAndUpdate(id, newFolder, { new: true }).exec();
  }

  public static getAll(): Promise<IFolder[]> {
    return folderModel.find({}).exec();
  }

  public static add(newFolder: IFolder): Promise<IFolder> {
    return newFolder.save();
  }

  public static deleteById(userID: string): Promise<any> {
    return folderModel.deleteOne({ _id: userID }).exec();
  }
}
