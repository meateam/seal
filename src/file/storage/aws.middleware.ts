// // This file is to be replaced with storage.manager when the s3 api will work.
// import * as AWS from 'aws-sdk';
// import * as multer from 'multer';
// import * as multerS3 from 'multer-s3';
// import { storageURL, bucketName, accessKey, secretKey } from './storage.config';

// // const ep = new AWS.Endpoint(storageURL);
// // // TODO: check if 'endpoint' is O.K
// // const s3bucket = new AWS.S3({
// //   endpoint: ep.href,
// // });
// // AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });

// // const storageS3 = multerS3({
// //   s3: s3bucket,
// //   bucket: bucketName,
// //   key: (req: Express.Request, file: Express.Multer.File, ConfigBase) => {
// //     ConfigBase(null, Date.now().toString());
// //   }
// // });

// // export const upload = multer({ storage: storageS3 }).any();

// // ************************************** MINIO ************************************** //
// const Minio = require('minio');
// const AK = 'sealminio';
// const SK = '/QixUY2oU6YY0f+LSjbVsmlFxfUqSn5LA7x26nSVUDKJcU7kn9kxNRY+wdLNDHBWfxnOdR8SO1XmQ2A5NRr2Uw==';
// const region = 'us-east-1';

// console.log('Starting s3Test');

// const minioClient = new Minio.Client({
//   endPoint: '40.113.65.101',
//   port: 9000,
//   secure: false,
//   accessKey: AK,
//   secretKey: SK,
// });

// // File that needs to be uploaded.
// // TODO: change file path.
// const file = './2.jpg';

// console.log('Creating bucket');
// // Make a bucket called bucketName.

// minioClient.bucketExists(bucketName, (err, exists) => {
//   if (err) {
//     return console.log(err);
//   }
//   if (exists) {
//     console.log(bucketName + 'Exists!');
//     uploadFile();
//   } else {
//     console.log(bucketName + 'DOES NOT Exist!');
//     minioClient.makeBucket(bucketName, region, (err) => {
//       if (err) {
//         console.log('Error creating bucket');
//         return console.log(err);
//       }

//       console.log(`Bucket created successfully in ${region}.`);
//       uploadFile();
//     });
//   }

// });

// function uploadFile() {
//   // Using fPutObject API upload your file to the bucket bucketName.
//   // minioClient.fPutObject(bucketName, 'photos-europe.tar', file, ['application/octet-stream'], (err, eTag) => {
//   //   if (err) {
//   //     console.log('File upload error :(')
//   //     return console.log(err);
//   //   }
//   //   console.log('File uploaded successfully.');
//   // });

//   // ANOTHER METHOD FOR UPLOADING A FILE
//   const Fs = require('fs');
//   const fileStream = Fs.createReadStream(file);
//   const fileStat = Fs.stat(file, (err, stats) => {
//     if (err) {
//       return console.log(err);
//     }
//     minioClient.putObject(bucketName, 'seal2.png', fileStream, stats.size, (err, eTag) => {
//       if (err) {
//         console.log('An error occurred while uploading a file');
//         return console.log(err, eTag); // err should be null
//       }
//       console.log('file uploaded successfully!');
//     });
//   });
// }
