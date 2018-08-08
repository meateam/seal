import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

const ep = new AWS.Endpoint('STRING HERE');
const s3 = new AWS.S3({ endpoint: ep });
AWSError.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });

const storageS3 = multerS3({
  s3,
  bucket: 'seal_bucket',
  key: (req, res, cb) => {
    ConfigBase(null, Date.now().toString());
  }
});

export let upload = multer({ storage: storageS3 }).any();
