import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  @ViewChild('filePond') filePond: any;
  filesCount: Observable<number>;

  FileStatus = {
    INIT: 1,
    IDLE: 2,
    PROCESSING: 3,
    PROCESSING_PAUSED: 4,
    PROCESSING_COMPLETE: 5,
    PROCESSING_ERROR: 6,
    LOADING: 7,
    LOAD_ERROR: 8
  };

  pondOptions = {
    class: 'file-pond',
    maxFiles: 25,
    multiple: true,
    labelIdle: 'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
    server: {
      process: `${environment.api}/file/upload`,
      revert: {
        url: `${environment.api}/file`,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    },
    instantUpload: true,
    dropOnElement: false,
    dropOnPage: true,
    imagePreviewHeight: 250,
    required: true,
    allowImagePreview: true,
    allowRevert: false
  };

  ngOnInit() {
    console.log(this.filePond);
  }

  ngOnDestroy() {
    this.filePond.destroy();
  }

  removeAll() {
    this.filePond.removeFiles();
  }

  processAll() {
    const files = this.filePond.getFiles();
    for (let i = 0; i < files.length; i++) {
      if (files[i].status !== this.FileStatus.PROCESSING &&
        files[i].status !== this.FileStatus.PROCESSING_COMPLETE &&
        files[i].status !== this.FileStatus.PROCESSING_PAUSED) {
          this.filePond.processFile(files[i].id);
      }
    }
  }

  pondHandleAddFile(event: any) {
    const file: any = event.file;
    if (file) {
      file.setMetadata('name', file.filename);
      file.setMetadata('lastModified', file.file.lastModified);
      file.setMetadata('size', file.fileSize);
      file.setMetadata('type', file.fileType);
      file.setMetadata('extension', file.fileExtension);
    }
  }
}
