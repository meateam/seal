import { Component, ViewChild, OnInit } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { Observable } from 'rxjs';
import { FilesListComponent } from './files-list/files-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: UploadComponent;
  @ViewChild('filesList') filesList: FilesListComponent;
  currUser: Observable<any>;

  ngOnInit() {
    this.fileUpload.upload.subscribe(() => {
      this.filesList.getFiles();
    });
    this.currUser = this.filesList.getUser();
  }
}
