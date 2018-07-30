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

  public updateFolder(id: String, newFolder: Partial<IFolder>): Promise<IFolder> {
    return FolderModel.findByIdAndUpdate(id, newFolder, { new: true }).exec();
  }

  public getByName(name: String): Promise<IFolder[]> {
    return FolderModel.find({ name }).exec();
  }
}
