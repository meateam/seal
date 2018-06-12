import * as express from 'express';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';

export let fileRouter: express.Router = express.Router();

fileRouter.post('/upload', async (req: express.Request, res: express.Response) => {
  if (!req.files) {
    return res.status(400).send({ message: 'Files cannot be empty' });
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

    try {
      const ret = await fileController.create(files);
      return res.send({ message: 'File saved successfully' });
    } catch (err) {
      return res.status(500).send({ message: 'Could not save file' });
    }
  }
});

fileRouter.get('/list', async (req: express.Request, res: express.Response) => {
  try {
    const ret = await fileController.list();
    return res.json({ success: true, return: ret });
  } catch (err) {
    return res.status(500).send({ message: 'Could not retrieve files' });
  }
});

fileRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const ret = await fileController.delete(req.params.id);
    return res.send({ message: 'File deleted successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Could not delete file' });
  }
});
