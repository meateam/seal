/**
 * Should be deprecated in the end.
 * Replaced by aws.middleware.ts.
 * simulates filesystem uploads instead of s3.
 */

import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as FS from 'fs';
import { NextFunction } from '../../../node_modules/@types/express';
import { accessKey, secretKey, bucketName, storageURL } from './storage.config';
import { fileController } from '../file.controller';

export const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  endpoint: storageURL,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
});

const storageS3 = multerS3({
  s3,
  bucket: bucketName,
  key: (req, file: Express.Multer.File, cb) => {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage: storageS3 }).any();

// getObject operation.
// TODO: decide what to do with path, need to use the original filename
// ./tempStorage sits with src in the same directory
// const writePath = './tempStorage/xxx.jpg';

// export const download = (req: Express.Request, res: Express.Response, next: NextFunction) => {
//   console.log('----------');
//   console.log(req);
//   // const writePath = './tempStorage/' + fileName;
//   const params = { Bucket: bucketName, Key: '1.jpg' };
//   const file = FS.createWriteStream(writePath);
//   s3.getObject(params).
//     on('httpData', (chunk) => {
//       file.write(chunk);
//     }).
//     on('httpDone', () => {
//       file.end();
//     }).
//     send();
//   next();
// };

// export const deleteFile = (fileName: string) => {
//   const params = {
//     Bucket: bucketName,
//     Delete: {
//       Objects: [
//         {
//           Key: fileName
//         },
//       ],
//     },
//   };

//   s3.deleteObjects(params, (err, data) => {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
// };
