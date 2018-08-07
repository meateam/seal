import * as express from 'express';
import * as mongoose from 'mongoose';
import { IFile } from './file.interface';
import { fileModel } from './file.model';

export class fileService {

  public static create(file: IFile): Promise<IFile> {
    return file.save();
  }

  public static delete(fileId: string): Promise<IFile> {
    return fileModel.deleteOne({ _id: fileId }).exec();
  }

  public static update(fileId: string, file: Partial<IFile>): Promise<IFile> {
    return fileModel.findByIdAndUpdate(fileId, file, { runValidators: true, new : true }).exec();
  }

  public static findById(fileId: string): Promise<IFile> {
    return fileModel.findById(fileId).exec();
  }

  public static findFiles(fieldType?: string, fieldValue?: string): Promise<IFile[]> {
    const condition: {[key: string]: any } = {};
    condition[fieldType] = fieldValue;
    if (fieldType) {
      return fileModel.find(condition).exec();
    }
    return fileModel.find({}).exec();
  }

  public static findByCreationDate (from: Date, to: Date): Promise<IFile[]> {
    return fileModel.find({
      createdAt : {
        $gte: from,
        $lte: to,
      },
    }).exec();
  }
}
