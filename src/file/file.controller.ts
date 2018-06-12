import * as express from 'express';
import { IFile } from './file.interface';
import { fileModel } from './file.model';
import { fileService } from './file.service';

export class fileController {

  public static create(files: IFile[]) {
    const services: Promise<IFile>[] = files.map((val) => {
      return fileService.create(val);
    });
    return Promise.all(services);
  }

  public static list() {
    return fileService.list();
  }

  public static delete(fileId: String) {
    return fileService.delete(fileId);
  }
}
