import * as express from 'express';
import * as mongoose from 'mongoose';
import { IFile } from './file.interface';
import { fileModel } from './file.model';

export class storageService {

//   public static create(file: IFile) {
//     return file.save();
//   }

//   public static delete(fileId: String) {
//     return fileModel.remove({ _id: fileId });
//   }

  public static update(filePath: String) {
    return filePath;
  }

//   public static findById(fileId: String) {
//     return fileModel.findById(fileId);
//   }

//   public static findFiles(fieldType?: String, fieldValue?: String) {
//     if (fieldType) {
//       return fileModel.find({ fieldType: fieldValue });
//     }
//     return fileModel.find();
//   }

//   public static findByDate (from?: Date, to?: Date) {
//     console.log(from);
//     console.log(to);
//     fileModel.find({
//       creationDate : {
//         $gte: from,
//         // $lt: to,
//       },
//     });
//   }
}
