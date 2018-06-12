import * as express from 'express';
import { IFile } from './file.interface';
import { fileModel } from './file.model';
import { fileService } from './file.service';

export class fileController {

  public static async create(files: IFile[], res: express.Response) {
    const services: Promise<void>[] = files.map((val) => {
      return fileService.create(val);
    });
    const ret = await Promise.all(services);
    res.json({ success: true, return: ret });
  }

  public static list() {
    return fileService.list();
  }

  public static delete(fileId: String) {
    return fileService.delete(fileId);
  }
}
