/**
 * Should be deprecated in the end.
 * Replaced by aws.middleware.ts.
 */

import * as multer from 'multer';
import { config } from '../../config';

const configStorage = multer.diskStorage({
  destination: (req, file, ConfigBase) => {
    ConfigBase(null, config.storage);
  },
  filename: (req, file, ConfigBase) => {
    // Choose how to save filename in Storage
    ConfigBase(null, file.originalname + '-' + Date.now());
  },
});

export let upload = multer({ storage: configStorage }).any();
