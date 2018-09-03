import * as express from 'express';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';
import * as FileErrors from '../errors/file';
import { upload } from './storage/storage.manager';

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
          path: 'User/root/' + val.originalname,
          // TODO: change the fileType
          fileType: val.originalname,
          creationDate: Date.now(),
          modifyDate: null,
          Owner: 'User',
          Parent: 'rootFolder',
        });
        return file;
      });
      const ret = await fileController.create(files);
      return res.send({ message: 'File saved successfully' });
      // return res.json({id: 12312321321});
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
    // will be changed to req.body instead of params
    const ret = await fileController.delete(req.params.id);
    if (ret) {
       // return res.json({id: 12312321321}); same here
      return res.json({ success: true, return: ret });
    }
    throw new FileErrors.FileNotFoundError();
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
    return res.send({ message: 'No Files Found' });
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
