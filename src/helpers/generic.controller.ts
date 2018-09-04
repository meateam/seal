import { EntityTypes } from './enums';
import { Model, Document } from 'mongoose';
import { RepositoryBase } from './repository';

export abstract class Controller<T extends Document> {
  public controllerType: EntityTypes;
  public model: Model<T>;
  public _repository: RepositoryBase<T>;
  constructor() { }
  public abstract createItems(num: number): any[];
  public abstract async getById(id: string): Promise<T>;
  public abstract async getAll(): Promise<T[]>;
  public abstract async getByName(name: string): Promise<T[]>;
  public abstract async update(id: string, partial: Partial<T>): Promise<T>;
  public abstract async add(item: T): Promise<T>;
  public abstract async deleteById(id: string): Promise<any>;
}
