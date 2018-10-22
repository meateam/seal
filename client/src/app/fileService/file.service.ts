import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { IFile } from '../file/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  public getFiles() {
    return this.httpClient.get<{success: boolean, return: IFile[]}>(`${environment.api}/file/`);
  }

  public downloadFile(id: string) {
    return this.httpClient.get<{success: boolean, return: IFile}>(`${environment.api}/file/${id}`);

  }

  public deleteFile(id: string) {
    return this.httpClient.delete<{success: boolean, return: IFile}>(`${environment.api}/file/${id}`);
  }
}
