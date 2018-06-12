import * as express from 'express';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';

export let fileRouter: express.Router = express.Router();

fileRouter.post('/upload', async (req: express.Request, res: express.Response) => {
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
        Owner: null,
        Parent: null,
      });
      return file;
    });
    const ret = await fileController.create(files);
    res.json({ success: true, return: ret });
  }
});

fileRouter.get('/list', async (req: express.Request, res: express.Response) => {
  const ret = await fileController.list();
  res.json({ success: true, return: ret });
});

fileRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  const ret = await fileController.delete(req.params.id);
  res.json({ success: true, return: ret });
});
