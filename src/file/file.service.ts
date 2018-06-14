import * as express from 'express';
import * as mongoose from 'mongoose';
import { IFile } from './file.interface';
import { fileModel } from './file.model';

export class fileService {

  public static create(file: IFile) {
    return file.save();
  }

  public static list() {
    return fileModel.find();
  }

  public static delete(fileId: String) {
    return fileModel.remove({ _id: fileId });
  }

  public static update(fileId: String, file: Partial<IFile>) {
    return fileModel.findByIdAndUpdate(fileId, file);
  }

  public static findById(fileId: String) {
    return fileModel.findById(fileId);
  }
}
