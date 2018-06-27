import * as express from 'express';
// import * as multer from 'multer';
// import * as multerS3 from 'multer-s3';
import { IFile } from './file.interface';
import { fileController } from './file.controller';
import { fileModel } from './file.model';
import { upload } from './storage/storage.manager';

export let fileRouter: express.Router = express.Router();

// fileRouter.post('/upload', multer({ dest: './uploads/' }).any(), (req, res) => {
//   console.log(req.body);
// });

fileRouter.post('/upload', upload, async (req: express.Request, res: express.Response) => {
  // console.log(req.files);
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
      // console.log('Files sent to controller: ' + files);
      const ret = await fileController.create(files);
      // console.log('Saved files: ' + ret);
      return res.send({ message: 'File saved successfully' });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: 'Could not save file - ' + err.message });
    }
  }
});

fileRouter.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const ret = await fileController.getFiles();
    return res.json({ success: true, return: ret });
  } catch (err) {
    return res.status(500).send({ message: 'Could not retrieve files - ' + err.message });
  }
});

fileRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const ret = await fileController.delete(req.params.id);
    return res.send({ message: 'File deleted successfully' });
  } catch (err) {
    return res.status(500).send({ message: 'Could not delete file - ' + err.message });
  }
});

fileRouter.get('/:fieldValue',
               async (req: express.Request, res: express.Response) => {
                 try {
                   let ret;
                   if (req.query.fromDate || req.query.toDate) {
                     console.log('From query');
                     console.log(req.query.fromDate);
                     console.log(req.query.toDate);
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
                   return res.status(404).send({ message: 'No files found' });
                 } catch (err) {
                   return res.status(500).send({
                     message: 'Could not retrieve files - ' + err.message });
                 }
               });

fileRouter.put('/:id' , async (req: express.Request, res: express.Response) => {
  try {
    const file: Partial<IFile> = req.body;
    const ret = await fileController.update(req.params.id, file);
    return res.send({ message: 'File updated successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Could not update file - ' + err.message });
  }
});
