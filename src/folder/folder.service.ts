/**
 * FolderService handles the calls to the database
 */
import { RepositoryBase } from '../helpers/repository';
import { IFolder } from './folder.interface';
import { FolderModel, IFolderModel } from './folder.model';

export default class FolderRepository extends RepositoryBase<IFolderModel> {
  constructor() {
    super(FolderModel);
  }

  public static update2(id: String, newFolder: Partial<IFolder>): Promise<IFolder> {
    return FolderModel.findByIdAndUpdate(id, newFolder, { new: true }).exec();
  }
}

export class FolderService {

  public static getById(id: String): Promise<IFolder> {
    return FolderModel.findById(id).exec();
  }

  public static getByName(name: String): Promise<IFolder[]> {
    return FolderModel.find({ name }).exec();
  }

  public static update(id: String, newFolder: Partial<IFolder>): Promise<IFolder> {
    return FolderModel.findByIdAndUpdate(id, newFolder, { new: true }).exec();
  }

  public static getAll(): Promise<IFolder[]> {
    return FolderModel.find({}).exec();
  }

  public static add(newFolder: IFolder): Promise<IFolder> {
    return newFolder.save();
  }

  public static deleteById(userID: string): Promise<any> {
    return FolderModel.deleteOne({ _id: userID }).exec();
  }
}
