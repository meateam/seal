import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import { AppComponent } from './app.component';
import { FileService } from './fileService/file.service';
import { FilesListComponent } from './files-list/files-list.component';
import { UploadComponent } from './upload/upload.component';

registerPlugin(FilePondPluginImagePreview);

@NgModule({
  declarations: [
    AppComponent,
    FilesListComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
    MatDividerModule,
    FilePondModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
