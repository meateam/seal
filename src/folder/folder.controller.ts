// import { Controller } from '../helpers/generic.controller';
// import { IFolder } from './folder.interface';
// import { EntityTypes } from '../helpers/enums';
// import { Model } from 'mongoose';
// import { folderModel } from './folder.model';

// export class FolderController extends Controller<IFolder>{
//   public controllerType: EntityTypes;
//   public model: Model<IFolder>;

//   constructor() {
//     super();
//     this.controllerType = EntityTypes.USER;
//     this.model = folderModel;
//   }

//   public createItems(num: number): IFolder[] {

//   }
//   public async getById(id: string): Promise<T>;
//   public async getAll(): Promise<T[]>;
//   public async getByName(name: string): Promise<T[]>;
//   public async update(id: string, partial: Partial<T>): Promise<T>;
//   public async add(item: T): Promise<T>;
//   public async deleteById(id: string): Promise<any>;
// }
