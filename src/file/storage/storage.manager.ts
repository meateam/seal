import * as multer from 'multer';

const configStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // Choose how to save filename in Storage
    cb(null, file.fieldname + '-' + Date.now());
  },
});

export let upload = multer({ storage: configStorage }).any();
