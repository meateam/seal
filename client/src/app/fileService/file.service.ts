import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { IFile } from '../file/file.interface';
import {saveAs as importedSaveAs} from 'file-saver';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '../../../node_modules/@angular/common/http/src/jsonp';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) { }

  public getFiles() {
    return this.httpClient.get<{success: boolean, return: IFile[]}>(`${environment.api}/file/`);
  }

  public downloadFile(id: string) {
    // return this.httpClient.get(`${environment.api}/file/${id}`, { responseType: 'text' }).subscribe(url => {
    return this.httpClient.get<{s3url: string, fileName: string}>(`${environment.api}/file/${id}`).subscribe(ret => {
      this.httpClient.get(ret.s3url, { responseType: 'blob' }).subscribe(blob => {
        importedSaveAs(blob, ret.fileName);
      });
    });
  }

  public deleteFile(id: string) {
    return this.httpClient.delete<{success: boolean, return: IFile}>(`${environment.api}/file/${id}`);
  }

  public getUser() {
    return this.httpClient.get<{success: boolean, return: string}>(`${environment.api}/user`);
  }
}
