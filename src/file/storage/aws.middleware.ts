// This file is to be replaced with storage.manager when the s3 api will work.
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { storageURL, bucketName } from './storage.config';

const ep = new AWS.Endpoint(storageURL);
// TODO: check if 'endpoint' is O.K
const s3 = new AWS.S3({ endpoint: ep.href });
AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });

const storageS3 = multerS3({
  s3,
  bucket: bucketName,
  key: (req: Express.Request, file: Express.Multer.File, ConfigBase) => {
    ConfigBase(null, Date.now().toString());
  }
});

export const upload = multer({ storage: storageS3 }).any();

// ************************************** MINIO ************************************** //

import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: 'play.minio.io',
  port: 9000,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});

// File that needs to be uploaded.
const file = '/tmp/photos-europe.tar';

// Make a bucket called europetrip.
minioClient.makeBucket('europetrip', 'us-east-1', (err) => {
  if (err) return console.log(err);

  console.log('Bucket created successfully in "us-east-1".');

  // Using fPutObject API upload your file to the bucket europetrip.
  minioClient.fPutObject('europetrip', 'photos-europe.tar', file, ['application/octet-stream'], (err, etag) => {
    if (err) return console.log(err);
    console.log('File uploaded successfully.');
  });
});
