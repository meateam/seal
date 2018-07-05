import { EntityTypes } from './enums';
import { Model, Document } from 'mongoose';

export abstract class Controller<T> {
  public controllerType: EntityTypes;
  public model: Model<Document>;
  constructor() { }
  public abstract async getById(id: string): Promise<T>;
  public abstract async getAll(): Promise<T[]>;
  public abstract async getByName(name: string): Promise<T[]>;
  public abstract async update(id: string, partial: Partial<T>): Promise<T>;
  public abstract async add(item: T): Promise<T>;
  public abstract async deleteById(id: string): Promise<any>;
}
