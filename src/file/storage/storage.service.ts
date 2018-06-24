import * as express from 'express';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { IFile } from '../file.interface';
import { fileModel } from '../file.model';

export class storageService {

//   public static create(file: IFile) {
//     return file.save();
//   }

  public static delete(filePath: fs.PathLike) {
    return fs.unlink(filePath, (err) => { if (err) throw err; });
  }

  public static update(filePath: String) {
    // TODO: Change filePath in S3 (fileName)
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
