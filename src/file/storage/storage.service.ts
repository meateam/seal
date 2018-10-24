import * as express from 'express';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { IFile } from '../file.interface';
import { fileModel } from '../file.model';

export class storageService {

  public static delete(filePath: fs.PathLike) {
    return fs.unlink(filePath, (err) => { if (err) throw err; });
  }

  public static update(filePath: String) {
    // TODO: Change filePath in S3 (fileName) (Necessary?)
    return filePath;
  }
}
