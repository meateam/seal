import { Controller } from '../helpers/generic.controller';
import { IFolder } from './folder.interface';
import { EntityTypes } from '../helpers/enums';
import { Model } from 'mongoose';
import { FolderModel, IFolderModel } from './folder.model';
import { createFolders } from '../helpers/functions';
import { FolderNotFoundError, BadIdError } from '../errors/folder';
import FolderRepository from './folder.repository';
import { ServerError } from '../errors/application';
import { FolderValidator } from './folder.validator';

export class FolderController extends Controller<IFolder>{
  public controllerType: EntityTypes;
  public model: Model<IFolder>;
  static _repository: FolderRepository = new FolderRepository();

  constructor() {
    super();
    this.controllerType = EntityTypes.FOLDER;
    this.model = FolderModel;
  }

  public createItems(num: number): IFolder[] {
    return createFolders(num);
  }

  public async getById(id: string): Promise<IFolder> {
    if (!FolderValidator.isValidMongoId(id)) {
      throw new BadIdError();
    }
    const folder = await FolderController._repository.findById(id);
    if (folder) {
      return <IFolderModel>folder;
    }
    throw new FolderNotFoundError();
  }

  public async getAll(): Promise<IFolder[]> {
    const folders = await FolderController._repository.find({});
    return <IFolderModel[]>folders;
  }

  public async getByName(name: string): Promise<IFolder[]> {
    return FolderController._repository.getByName(name);
  }

  public async update(id: string, partial: Partial<IFolder>): Promise<IFolder> {
    if (!FolderValidator.isValidUpdate(id, partial)) {
      throw new BadIdError();
    }
<<<<<<< HEAD
    const updatedUser = await FolderController._repository.updateFolder(partial._id, partial);
=======
    const updatedUser: IFolder = await FolderService.update(id, partial);
>>>>>>> d91d42a2f4b5129fd386ace9f00099140f00eb3a
    if (updatedUser) {
      return <IFolderModel>updatedUser;
    }
    throw new FolderNotFoundError();
  }

  public async add(folder: IFolder): Promise<IFolder> {
    const newFolder: IFolder = new FolderModel(folder);
    return <IFolderModel>await FolderController._repository.create(newFolder);
  }

  public async deleteById(id: string): Promise<any> {
    if (!FolderValidator.isValidMongoId(id)) {
      throw new FolderNotFoundError();
    }
    const res = await FolderController._repository.delete(id);
    if (!res.ok) {
      throw new ServerError();
    } else if (res.n < 1) {
      throw new FolderNotFoundError();
    }
    return res;
  }

}
