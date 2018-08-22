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

const bucketName = 'sealbucket';
const AK = 'sealminio';
const SK = '/QixUY2oU6YY0f+LSjbVsmlFxfUqSn5LA7x26nSVUDKJcU7kn9kxNRY+wdLNDHBWfxnOdR8SO1XmQ2A5NRr2Uw==';

const s3 = new AWS.S3({
  accessKeyId: AK,
  secretAccessKey: SK,
  endpoint: 'http://40.113.65.101:9000',
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

const params = { Bucket: bucketName, Key: '1.jpg' };
const writePath = '../../hi/sup.jpg';
const file = FS.createWriteStream(writePath);

export const download = (req: Express.Request, res: Express.Response, next: NextFunction) => {
  s3.getObject(params).
    on('httpData', (chunk) => {
      file.write(chunk);
    }).
    on('httpDone', () => {
      file.end();
    }).
    send();
  next();
};
