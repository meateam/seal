import * as express from 'express';
import { IFile } from './file.interface';
import { fileModel, IFileModel } from './file.model';
import FileRepository from './file.repository';
import { fileService } from './file.service';
import { storageService } from './storage/storage.service';

export class fileController {
  static _repository: FileRepository = new FileRepository();

  public static async create(files: IFile[]): Promise<IFile[]> {
    const services: Promise<IFile>[] = files.map((val) => {
      return fileService.create(val);
    });
    return await Promise.all(services);
  }

  // public static getFiles(fieldType?: string, fieldName?: string): Promise<IFile[]> {
  //   return fileService.findFiles(fieldType, fieldName);
  // }

  public static async getFiles(cond?: Object): Promise<IFile[]> {
    const files = await fileController._repository.find(cond);
    return <IFileModel[]> files;
  }

  public static findById(fileId: string): Promise<IFile> {
    return fileService.findById(fileId);
  }

  public static download(filePath: string) {
    return storageService.download(filePath);
  }

  public static findByDate(from?: string, to?: string): Promise<IFile[]> {
    let fromDate;
    let toDate;
    if (from) fromDate = new Date(from);
    else fromDate = new Date('0000000000000');
    if (to) toDate = new Date(to);
    else toDate = Date.now();
    return fileService.findByCreationDate(fromDate, toDate);
  }

  public static async delete(fileId: string): Promise<IFile> {
    const currFile: IFile = await fileController.findById(fileId);
    const ret = await fileService.delete(fileId);
    if (ret) {
      storageService.delete(currFile.path);
    }
    // TODO: Add if not deleted from storage
    return ret;
  }

  public static async update(fileId: string, file: Partial<IFile>): Promise<IFile> {
    const oldFile: IFile = await fileController.findById(fileId);
    const currFile = await fileService.update(fileId, file);
    if (currFile) {
      storageService.update(currFile.path, oldFile.path);
    }
    // TODO: Add if not updated in storage
    return currFile;
  }
}
