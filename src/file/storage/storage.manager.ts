/**
 * Should be deprecated in the end.
 * Replaced by aws.middleware.ts.
 * simulates filesystem uploads instead of s3.
 */

import * as multer from 'multer';
// import { config } from '../../config';

// const configStorage = multer.diskStorage({
//   destination: (req: Express.Request, file: Express.Multer.File, ConfigBase) => {
//     ConfigBase(null, config.storage);
//   },
//   filename: (req: Express.Request, file: Express.Multer.File, ConfigBase) => {
//     // Choose how to save filename in Storage
//     ConfigBase(null, file.originalname + '-' + Date.now());
//   },
// });

// export const upload = multer({ storage: configStorage }).any();

const AWS = require('aws-sdk');
const Fs = require('fs');
// const multer = require('multer');
const multerS3 = require('multer-s3');

const bucketName = 'sealbucket';
const AK = 'sealminio';
const SK = '/QixUY2oU6YY0f+LSjbVsmlFxfUqSn5LA7x26nSVUDKJcU7kn9kxNRY+wdLNDHBWfxnOdR8SO1XmQ2A5NRr2Uw==';

const s3 = new AWS.S3({
  accessKeyId: AK,
  secretAccessKey: SK,
  endpoint: 'http://40.113.65.101:9000',
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4'
});

const storageS3 = multerS3({
  s3,
  bucket: bucketName,
  key: (req, file, cb) => {
    cb(null, 'WillItWork');
  }
});

export const upload = multer({ storage: storageS3 }).any();
