import * as express from 'express';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';
import * as FileErrors from '../errors/file';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';

export class FileResponder {

  static async create(req: express.Request, res: express.Response) {
    if (!req.files) {
      throw new FileErrors.FilesEmpty();
    } else {
      const files = (<Express.Multer.File[]>req.files).map((val) => {
        const file: IFile = new fileModel({
          fileName: val.originalname,
          fileSize: val.size,
          path: val.originalname,
          fileType: path.parse(val.originalname).ext,
          creationDate: Date.now(),
          modifyDate: null,
          Owner: 'User',
          Parent: 'rootFolder',
        });
        return file;
      });
      const ret = await fileController.create(files);
      return res.send({ message: 'File saved successfully' });
    }
  }

  static async getAll(req: express.Request, res: express.Response) {
    const ret = await fileController.getFiles();
    if (ret) {
      return res.json({ success: true, return: ret });
    }
    return res.send({ message: 'No Files Found' });
  }

  static async delete(req: express.Request, res: express.Response) {
    return res.json(await fileController.delete(req.params.id));
  }

  static async download(req: express.Request, res: express.Response) {
    const ret = await fileController.findById(req.params.id);
    if (ret) {
      const url = fileController.download(ret.path);
      return res.send({ s3url: url, fileName: ret.fileName });
    }
    throw new FileErrors.FileNotFoundError();
  }

  static async get(req: express.Request, res: express.Response) {
    let ret;
    if (req.query.fromDate || req.query.toDate) {
      ret = await fileController.findByDate(req.query.fromDate,
                                            req.query.toDate);
    }
    else ret = await fileController.getFiles(req.query);
    if (ret.length > 0) {
      return res.json({ success: true, return: ret });
    }
    return res.send({ message: 'No Files Found with specific conditions' });
  }

  static async update(req: express.Request, res: express.Response) {
    const file: Partial<IFile> = req.body;
    return res.json(await fileController.update(req.params.id, file));
  }
}
