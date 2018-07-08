import * as express from 'express';
import { IFile } from './file.interface';
import { fileModel } from './file.model';
import { fileService } from './file.service';
import { storageService } from './storage/storage.service';

export class fileController {

  public static async create(files: IFile[]) {
    const services: Promise<IFile>[] = files.map((val) => {
      return fileService.create(val);
    });
    const ret = await Promise.all(services);
    // console.log('ret promise all:');
    // console.log(ret);
    return ret;
  }

  public static getFiles(fieldType?: string, fieldName?: string) {
    return fileService.findFiles(fieldType, fieldName);
  }

  public static findById(fileId: string) {
    return fileService.findById(fileId);
  }

  public static findByDate(from?: string, to?: string) {
    let fromDate;
    let toDate;
    if (from) fromDate = new Date(from);
    else fromDate = new Date('0000000000000');
    if (to) toDate = new Date(to);
    else toDate = Date.now();
    return fileService.findByDate(fromDate, toDate);
  }

  public static async delete(fileId: string) {
    const currFile: IFile = await fileController.findById(fileId);
    const ret = await fileService.delete(fileId);
    // TODO: Add if not deleted from storage
    return storageService.delete(currFile.path);
  }

  public static async update(fileId: string, file: Partial<IFile>) {
    const ret = await fileService.update(fileId, file);
    const currFile: IFile = await fileController.findById(fileId);
    // TODO: Add if not updated in storage
    return storageService.update(currFile.path);
  }
}
