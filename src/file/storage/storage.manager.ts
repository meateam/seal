/**
 * Should be deprecated in the end.
 * Replaced by aws.middleware.ts.
 * simulates filesystem uploads instead of s3.
 */

import * as multer from 'multer';
import { config } from '../../config';

const configStorage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, ConfigBase) => {
    ConfigBase(null, config.storage);
  },
  filename: (req: Express.Request, file: Express.Multer.File, ConfigBase) => {
    // Choose how to save filename in Storage
    ConfigBase(null, file.originalname + '-' + Date.now());
  },
});

export const upload = multer({ storage: configStorage }).any();
