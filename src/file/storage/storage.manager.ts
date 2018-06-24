import * as multer from 'multer';
import { config } from '../../config';

const configStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.storage);
  },
  filename: (req, file, cb) => {
    // Choose how to save filename in Storage
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, file.originalname + '-' + Date.now());
  },
});

export let upload = multer({ storage: configStorage }).any();
