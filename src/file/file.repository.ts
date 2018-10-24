import { IFile } from './file.interface';
import { fileModel, IFileModel } from './file.model';
import { RepositoryBase } from '../helpers/repository';

export default class FileRepository extends RepositoryBase<IFileModel> {
  constructor() {
    super(fileModel);
  }
  public updatePartialUser(id: String, newFile: Partial<IFile>): Promise<IFile> {
    return fileModel.findByIdAndUpdate(id, newFile, { new: true }).exec();
  }
  public getByName(name: String): Promise<IFile[]> {
    return fileModel.find({ name }).exec();
  }
}
