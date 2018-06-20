import * as express from 'express';
import { IFile } from './file.interface';
import { fileModel } from './file.model';
import { fileService } from './file.service';
import { storageService } from './storage/storage.service';

export class fileController {

  public static create(files: IFile[]) {
    const services: Promise<IFile>[] = files.map((val) => {
      console.log('Files sent to create: ' + val);
      return fileService.create(val);
    });
    return Promise.all(services);
  }

  public static getFiles(fieldType?: String, fieldName?: String) {
    return fileService.findFiles(fieldType, fieldName);
  }

  public static findById(fileId: String) {
    return fileService.findById(fileId);
  }

  public static findByDate(from?: Date, to?: Date) {
    return fileService.findByDate(from, to);
  }

  public static async delete(fileId: String) {
    const ret = await fileService.delete(fileId);
    const currFile: IFile = await fileController.findById(fileId);
    // Add if not deleted from storage
    return storageService.delete(currFile.path);
  }

  public static async update(fileId: String, file: Partial<IFile>) {
    const ret = await fileService.update(fileId, file);
    const currFile: IFile = await fileController.findById(fileId);
    // Add if not updated in storage
    return storageService.update(currFile.path);
  }
}
