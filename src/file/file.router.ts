import * as express from 'express';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { IFile } from './file.interface';
import { fileController } from './file.controller';

export let fileRouter: express.Router = express.Router();

fileRouter.post('/upload', (req: express.Request, res: express.Response) => {
  if (!req.files) {
    res.status(400).send({ message: 'Files cannot be empty' });
  } else {
    // const files: IFile[] = [];
    // for (const i of <Express.Multer.File[]>req.files) {
    //   const file: IFile = {
    //     fileName: i.originalname,
    //     fileSize: i.size,
    //     path: i.path,
    //     fileType: i.originalname,
    //     creationDate: Date.now(),
    //     modifyDate: null,
    //     Owner: null,
    //     Parent: null,
    //   };
    //   files.push(file);
    // }
    const files = (<Express.Multer.File[]>req.files).map((val) => {
      return {
        fileName: val.originalname,
        fileSize: val.size,
        path: val.path,
        fileType: val.originalname,
        creationDate: Date.now(),
        modifyDate: null,
        Owner: null,
        Parent: null,
      };
    });
    fileController.create(files, res);
  }
});

fileRouter.get('/list', (req: express.Request, res: express.Response) => {
  fileController.list();
});

fileRouter.delete('/delete/:id', (req: express.Request, res: express.Response) => {
  fileController.delete(req.params.id);
});
