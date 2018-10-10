import * as express from 'express';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';
import * as FileErrors from '../errors/file';
import * as path from 'path';

export class FileResponder {

  static async create(req: express.Request, res: express.Response) {
    if (!req.files) {
      throw new FileErrors.FilesEmpty();
    } else {
      const files = (<Express.Multer.File[]>req.files).map((val) => {
        const file: IFile = new fileModel({
          fileName: val.originalname,
          fileSize: val.size,
          // TODO: Change file path.
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
    return res.send({ message: 'No Files Found - getALL' });
  }

  static async delete(req: express.Request, res: express.Response) {
    const ret = await fileController.delete(req.params.id);
    if (ret) {
      return res.json({ success: true, return: ret });
    }
    throw new FileErrors.FileNotFoundError();
  }

  static async download(req: express.Request, res: express.Response) {
    const ret = await fileController.findById(req.params.id);
    if (ret) {
      fileController.download(ret.path);
    }
    return res.send({ message: 'No Files Found - download' });
  }

  static async get(req: express.Request, res: express.Response) {
    let ret;
    if (req.query.fromDate || req.query.toDate) {
      ret = await fileController.findByDate(req.query.fromDate,
                                            req.query.toDate);
    } else if (req.query.fieldType) {
      ret = await fileController.getFiles(req.query.fieldType,
                                          req.params.fieldValue);
    } else {
      ret = await fileController.findById(req.params.fieldValue);
    }
    if (ret) {
      return res.json({ success: true, return: ret });
    }
    return res.send({ message: 'No Files Found - specific' });
  }

  static async update(req: express.Request, res: express.Response) {
    const file: Partial<IFile> = req.body;
    const ret = await fileController.update(req.params.id, file);
    if (ret) {
      return res.json({ success: true, return: ret });
    }
    throw new FileErrors.FileNotFoundError();
  }
}
