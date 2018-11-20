import { Component, ViewChild, OnInit } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { Observable } from 'rxjs';
import { FilesListComponent } from './files-list/files-list.component';
import { FileService } from './fileService/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: UploadComponent;
  @ViewChild('filesList') filesList: FilesListComponent;
  currUser: string;
  constructor(public fileService: FileService) { }

  ngOnInit() {
    this.fileUpload.upload.subscribe(() => {
      this.filesList.getFiles();
    });
    const sub = this.fileService.getUser().subscribe((user) => {
      this.currUser = user.return;
    }, (err) => {
    }, () => {
      sub.unsubscribe();
    });
  }
}
