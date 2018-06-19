import * as express from 'express';
import { IFile } from './file.interface';
import { fileModel } from './file.model';
import { fileService } from './file.service';
import { storageService } from './storage/storage.service';

export class fileController {

  public static create(files: IFile[]) {
    const services: Promise<IFile>[] = files.map((val) => {
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

  public static delete(fileId: String) {
    // Decide if to save for monitoring purposes
    return fileService.delete(fileId);
  }

  public static async update(fileId: String, file: Partial<IFile>) {
    const ret = await fileService.update(fileId, file);
    const currFile: IFile = await fileController.findById(fileId);
    return storageService.update(currFile.path);
  }
}
