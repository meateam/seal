import * as express from 'express';
import { IFile } from './file.interface';
import { fileModel, IFileModel } from './file.model';
import FileRepository from './file.repository';
import * as FileErrors from '../errors/file';
import { fileService } from './file.service';
import { storageService } from './storage/storage.service';

export class fileController {
  static _repository: FileRepository = new FileRepository();

  public static async create(files: IFile[]): Promise<IFile[]> {
    try {
      const services = files.map((val) => {
        const newFile: IFile = new fileModel(val);
        // return fileController._repository.create(newFile);
        return fileService.create(newFile);
      });
      const ret = <IFileModel[]>await Promise.all(services);
      // if (ret) {
      return ret;
      // }
    } catch (error) {
      console.log(error);
      // TODO : filepath unknown - find which file to delete
      // Delete file from S3 if DB fails
      // const res = await storageService.delete(filepath);
      // if (res.Errors && res.Errors.length > 0) {
      //   throw new FileErrors.DeleteFileError(res.Errors);
      // }
      throw new FileErrors.FileError(error);
    }
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

  public static async delete(fileId: string): Promise<any> {
    const currFile: IFile = await fileController.findById(fileId);
    const ret = await fileService.delete(fileId);
    if (ret) {
      const res = await storageService.delete(currFile.path);
      if (res.Errors && res.Errors.length > 0) {
        // TODO: Create file in DB if delete from storage fail?
        throw new FileErrors.DeleteFileError(res.Errors);
      }
      return ret;
    }
    throw new FileErrors.FileNotFoundError();
  }

  public static async update(fileId: string, file: Partial<IFile>): Promise<IFile> {
    const oldFile: IFile = await fileController.findById(fileId);
    const currFile = await fileService.update(fileId, file);
    if (currFile) {
      const res: any = await storageService.update(currFile.path, oldFile.path);
      if (res.error) {
        // TODO: Change DB update if Storage fails
        throw new FileErrors.UpdateFileError(res.error);
      }
      return currFile;
    }
    throw new FileErrors.FileNotFoundError();
  }
}
