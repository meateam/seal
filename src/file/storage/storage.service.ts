import * as express from 'express';
import * as mongoose from 'mongoose';
import { IFile } from '../file.interface';
import { fileModel } from '../file.model';
import { s3 } from './storage.manager';
import { bucketName } from './storage.config';
import * as FS from 'fs';

export class storageService {

  public static async delete(filePath: string): Promise<any> {
    const params = {
      Bucket: bucketName,
      Delete: {
        Objects: [
          {
            Key: filePath
          },
        ],
      },
    };
    const ret = await s3.deleteObjects(params, (err, data) => {}).promise();
    return ret;
  }

  public static async update(newPath: string, oldPath: string) {
    const copyParams = {
      Bucket: bucketName,
      CopySource: `${bucketName}/${oldPath}`,
      Key: newPath };
    const deleteParams = {
      Bucket: bucketName,
      Delete: {
        Objects: [
          {
            Key: oldPath
          },
        ],
      },
    };
    // Copy the object to a new location
    // copyObject has uncatchable error - NoSuchKey
    const ret = await s3.copyObject(copyParams, (err, data) => {
      if (err) return({ error: err });
    })
      .promise()
      .then(async () => {
        // Delete the old object
        const ret1 = await s3.deleteObjects(deleteParams, (err, data) => {
          if (err || data.Errors) return({ error: err });
        }).promise();
        return ret1;
      });
    return ret;
  }

  public static download(filePath: string) {

    const url = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: filePath,
      Expires: 60
    });
    return url;
  }
}
