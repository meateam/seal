import * as express from 'express';
import * as mongoose from 'mongoose';
import { IFile } from './file.interface';
import { fileModel } from './file.model';

export class fileService {

  public static create(file: IFile) {
    // console.log('File saved: ' + file);
    return file.save();
  }

  public static delete(fileId: string) {
    return fileModel.remove({ _id: fileId });
  }

  public static update(fileId: string, file: Partial<IFile>) {
    return fileModel.findByIdAndUpdate(fileId, file);
  }

  public static findById(fileId: string) {
    return fileModel.findById(fileId);
  }

  public static findFiles(fieldType?: string, fieldValue?: string) {
    const condition: {[key: string]: any } = {};
    condition[fieldType] = fieldValue;
    if (fieldType) {
      return fileModel.find(condition);
    }
    return fileModel.find();
  }

  public static findByDate (from: Date, to: Date) {
    console.log(from);
    console.log(to);
    // if (from.toString() === 'Invalid Date' || to.toString() === 'Invalid Date') {
    //   throw new TypeError('Invalid Date');
    // }
    return fileModel.find({
      createdAt : {
        $gte: from,
        $lte: to,
      },
    });
  }
}
