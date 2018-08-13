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
  key: (req, res, ConfigBase) => {
    ConfigBase(null, Date.now().toString());
  }
});

export const upload = multer({ storage: storageS3 }).any();
