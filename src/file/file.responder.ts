import * as express from 'express';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';
import * as FileErrors from '../errors/file';
import { upload } from './storage/storage.manager';

export class FileResponder {

  static async create(req: express.Request, res: express.Response) {
    if (!req.files) {
      res.status(400).send({ message: 'Files cannot be empty' });
    } else {
      const files = (<Express.Multer.File[]>req.files).map((val) => {
        const file: IFile = new fileModel({
          fileName: val.originalname,
          fileSize: val.size,
          path: val.path,
          fileType: val.originalname,
          creationDate: Date.now(),
          modifyDate: null,
          Owner: 'User',
          Parent: 'rootFolder',
        });
        return file;
      });

      try {
        const ret = await fileController.create(files);
        return res.send({ message: 'File saved successfully' });
      } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Could not save file - ' + err.message });
      }
    }
  }

  static async getAll(req: express.Request, res: express.Response) {
    try {
      const ret = await fileController.getFiles();
      return res.json({ success: true, return: ret });
    } catch (err) {
      return res.status(500).send({ message: 'Could not retrieve files - ' + err.message });
    }
  }

  static async delete(req: express.Request, res: express.Response) {
    try {
      const ret = await fileController.delete(req.params.id);
      return res.send({ message: 'File deleted successfully' });
    } catch (err) {
      return res.status(500).send({ message: 'Could not delete file - ' + err.message });
    }
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
    throw new FileErrors.NoFilesFoundError();
  }

  static async update(req: express.Request, res: express.Response) {
    try {
      const file: Partial<IFile> = req.body;
      const ret = await fileController.update(req.params.id, file);
      return res.send({ message: 'File updated successfully' });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: 'Could not update file - ' + err.message });
    }
  }
}
