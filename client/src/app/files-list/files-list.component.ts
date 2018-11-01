import { Component, OnInit } from '@angular/core';
import { IFile } from '../file/file.interface';
import { FileService } from '../fileService/file.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {
  files: IFile[] = [];
  constructor(public fileService: FileService) { }

  ngOnInit() {
    const sub = this.fileService.getFiles().subscribe((files) => {
      this.files = files.return;
    }, (err) => {
    }, () => {
      sub.unsubscribe();
    });
  }

  public getFiles() {
    const sub = this.fileService.getFiles().subscribe((files) => {
      this.files = files.return;
    }, (err) => {
    }, () => {
      sub.unsubscribe();
    });
  }

  public deleteFile(id: string) {
    const sub = this.fileService.deleteFile(id).subscribe((file) => {
      this.getFiles();
    },
    (err) => {
    }, () => {
      sub.unsubscribe();
    });
  }

  public downloadFile(id: string) {
    this.fileService.downloadFile(id);
  }
}
