import { Controller } from '../helpers/generic.controller';
import { IFolder } from './folder.interface';
import { EntityTypes } from '../helpers/enums';
import { Model } from 'mongoose';
import { FolderModel, IFolderModel } from './folder.model';
import { createFolders } from '../helpers/functions';
import { FolderError, FolderNotFoundError, BadIdError } from '../errors/folder';
import FolderRepository, { FolderService } from './folder.service';
import { ServerError } from '../errors/application';
import { FolderValidator } from './folder.validator';

export class FolderController extends Controller<IFolder>{
  public controllerType: EntityTypes;
  public model: Model<IFolder>;

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
    // const folder = await FolderService.getById(id);
    const folder = await (new FolderRepository).findById(id);
    if (folder) {
      return <IFolderModel>folder;
    }
    throw new FolderNotFoundError();
  }

  public async getAll(): Promise<IFolder[]> {
    return FolderService.getAll();
  }

  public async getByName(name: string): Promise<IFolder[]> {
    return FolderService.getByName(name);
  }

  public async update(id: string, partial: Partial<IFolder>): Promise<IFolder> {
    if (!FolderValidator.isValidUpdate(id, partial)) {
      throw new BadIdError();
    }
    const updatedUser: IFolder = await FolderService.update(partial._id, partial);
    if (updatedUser) {
      return updatedUser;
    }
    throw new FolderNotFoundError();
  }

  public async add(folder: IFolder): Promise<IFolder> {
    const newFolder: IFolder = new FolderModel(folder);
    return FolderService.add(newFolder);
  }

  public async deleteById(id: string): Promise<any> {
    if (!FolderValidator.isValidMongoId(id)) {
      throw new FolderNotFoundError();
    }
    const res = await FolderService.deleteById(id);
    if (!res.ok) {
      throw new ServerError();
    } else if (res.n < 1) {
      throw new FolderNotFoundError();
    }
    return res;
  }

}
