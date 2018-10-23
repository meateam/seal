(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-upload #fileUpload></app-upload>\r\n\r\n<mat-divider></mat-divider>\r\n<div class=\"files-list\">\r\n  <app-files-list #filesList></app-files-list>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".files-list {\n  margin: 1rem; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _upload_upload_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upload/upload.component */ "./src/app/upload/upload.component.ts");
/* harmony import */ var _files_list_files_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./files-list/files-list.component */ "./src/app/files-list/files-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fileUpload.upload.subscribe(function () {
            _this.filesList.getFiles();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileUpload'),
        __metadata("design:type", _upload_upload_component__WEBPACK_IMPORTED_MODULE_1__["UploadComponent"])
    ], AppComponent.prototype, "fileUpload", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filesList'),
        __metadata("design:type", _files_list_files_list_component__WEBPACK_IMPORTED_MODULE_2__["FilesListComponent"])
    ], AppComponent.prototype, "filesList", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/esm5/divider.es5.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/esm5/tooltip.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_filepond__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-filepond */ "./node_modules/ngx-filepond/esm5/ngx-filepond.js");
/* harmony import */ var filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! filepond-plugin-image-preview */ "./node_modules/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js");
/* harmony import */ var filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _fileService_file_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fileService/file.service */ "./src/app/fileService/file.service.ts");
/* harmony import */ var _files_list_files_list_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./files-list/files-list.component */ "./src/app/files-list/files-list.component.ts");
/* harmony import */ var _upload_upload_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./upload/upload.component */ "./src/app/upload/upload.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















Object(ngx_filepond__WEBPACK_IMPORTED_MODULE_10__["registerPlugin"])(filepond_plugin_image_preview__WEBPACK_IMPORTED_MODULE_11___default.a);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"],
                _files_list_files_list_component__WEBPACK_IMPORTED_MODULE_14__["FilesListComponent"],
                _upload_upload_component__WEBPACK_IMPORTED_MODULE_15__["UploadComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material_list__WEBPACK_IMPORTED_MODULE_3__["MatListModule"],
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__["MatTooltipModule"],
                _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__["MatDividerModule"],
                ngx_filepond__WEBPACK_IMPORTED_MODULE_10__["FilePondModule"]
            ],
            providers: [_fileService_file_service__WEBPACK_IMPORTED_MODULE_13__["FileService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/fileService/file.service.ts":
/*!*********************************************!*\
  !*** ./src/app/fileService/file.service.ts ***!
  \*********************************************/
/*! exports provided: FileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileService", function() { return FileService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FileService = /** @class */ (function () {
    function FileService(httpClient) {
        this.httpClient = httpClient;
    }
    FileService.prototype.getFiles = function () {
        return this.httpClient.get(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].api + "/file/");
    };
    FileService.prototype.downloadFile = function (id) {
        var _this = this;
        // return this.httpClient.get(`${environment.api}/file/${id}`, { responseType: 'text' }).subscribe(url => {
        return this.httpClient.get(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].api + "/file/" + id).subscribe(function (ret) {
            _this.httpClient.get(ret.s3url, { responseType: 'blob' }).subscribe(function (blob) {
                Object(file_saver__WEBPACK_IMPORTED_MODULE_3__["saveAs"])(blob, ret.fileName);
            });
        });
    };
    FileService.prototype.deleteFile = function (id) {
        return this.httpClient.delete(_environments_environment_prod__WEBPACK_IMPORTED_MODULE_2__["environment"].api + "/file/" + id);
    };
    FileService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], FileService);
    return FileService;
}());



/***/ }),

/***/ "./src/app/files-list/files-list.component.html":
/*!******************************************************!*\
  !*** ./src/app/files-list/files-list.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-list>\r\n  <h3 mat-subheader>Files</h3>\r\n  <mat-list-item *ngFor=\"let file of files\">\r\n    <button mat-icon-button matTooltip=\"Download file\" (click)=\"downloadFile(file._id)\">\r\n        <mat-icon>cloud_download</mat-icon>\r\n    </button>\r\n    <h4 mat-line>{{file.fileName}}</h4>\r\n    <p mat-line>{{file.fileSize}}</p>\r\n    <button mat-icon-button matTooltip=\"Delete file\" (click)=\"deleteFile(file._id)\">\r\n        <mat-icon>delete</mat-icon>\r\n    </button>\r\n\r\n  </mat-list-item>\r\n</mat-list>"

/***/ }),

/***/ "./src/app/files-list/files-list.component.scss":
/*!******************************************************!*\
  !*** ./src/app/files-list/files-list.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-list-icon {\n  color: rgba(0, 0, 0, 0.54); }\n"

/***/ }),

/***/ "./src/app/files-list/files-list.component.ts":
/*!****************************************************!*\
  !*** ./src/app/files-list/files-list.component.ts ***!
  \****************************************************/
/*! exports provided: FilesListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilesListComponent", function() { return FilesListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _fileService_file_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fileService/file.service */ "./src/app/fileService/file.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilesListComponent = /** @class */ (function () {
    function FilesListComponent(fileService) {
        this.fileService = fileService;
        this.files = [];
    }
    FilesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sub = this.fileService.getFiles().subscribe(function (files) {
            _this.files = files.return;
        }, function (err) {
        }, function () {
            sub.unsubscribe();
        });
    };
    FilesListComponent.prototype.getFiles = function () {
        var _this = this;
        var sub = this.fileService.getFiles().subscribe(function (files) {
            _this.files = files.return;
        }, function (err) {
        }, function () {
            sub.unsubscribe();
        });
    };
    FilesListComponent.prototype.deleteFile = function (id) {
        var _this = this;
        var sub = this.fileService.deleteFile(id).subscribe(function (file) {
            _this.getFiles();
        }, function (err) {
        }, function () {
            sub.unsubscribe();
        });
    };
    FilesListComponent.prototype.downloadFile = function (id) {
        this.fileService.downloadFile(id);
    };
    FilesListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-files-list',
            template: __webpack_require__(/*! ./files-list.component.html */ "./src/app/files-list/files-list.component.html"),
            styles: [__webpack_require__(/*! ./files-list.component.scss */ "./src/app/files-list/files-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_fileService_file_service__WEBPACK_IMPORTED_MODULE_1__["FileService"]])
    ], FilesListComponent);
    return FilesListComponent;
}());



/***/ }),

/***/ "./src/app/upload/upload.component.html":
/*!**********************************************!*\
  !*** ./src/app/upload/upload.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"upload\">\r\n    <div class=\"controls\">\r\n        <div class=\"buttons\">\r\n            <button mat-icon-button matTooltip=\"Clear List\" (click)=\"removeAll()\">\r\n                <mat-icon>cancel</mat-icon>\r\n            </button>\r\n            <mat-hint class=\"filesCount\">{{filePond && filePond.getFiles ? filePond.getFiles().length : 0}}/{{pondOptions.maxFiles}}</mat-hint>\r\n            <button mat-icon-button matTooltip=\"Upload All\" (click)=\"processAll()\">\r\n                <mat-icon>cloud_upload</mat-icon>\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <file-pond #filePond\r\n        [options]=\"pondOptions\"\r\n        (onaddfile)=\"pondHandleAddFile($event)\"\r\n        (onprocessfile)=\"emitUpload($event)\">\r\n    </file-pond>\r\n</div>"

/***/ }),

/***/ "./src/app/upload/upload.component.scss":
/*!**********************************************!*\
  !*** ./src/app/upload/upload.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".controls {\n  margin-top: 1rem;\n  margin-bottom: 1.25rem;\n  display: flex;\n  justify-content: center; }\n\n.buttons {\n  width: 20%;\n  display: flex;\n  justify-content: space-evenly; }\n\n.filesCount {\n  padding-top: 0.5rem;\n  left: 1em;\n  right: 1em;\n  top: 0;\n  margin: 0 0 1em 0;\n  color: #4f4f4f;\n  will-change: transform, opacity; }\n"

/***/ }),

/***/ "./src/app/upload/upload.component.ts":
/*!********************************************!*\
  !*** ./src/app/upload/upload.component.ts ***!
  \********************************************/
/*! exports provided: UploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploadComponent = /** @class */ (function () {
    function UploadComponent() {
        this.upload = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.FileStatus = {
            INIT: 1,
            IDLE: 2,
            PROCESSING: 3,
            PROCESSING_PAUSED: 4,
            PROCESSING_COMPLETE: 5,
            PROCESSING_ERROR: 6,
            LOADING: 7,
            LOAD_ERROR: 8
        };
        this.pondOptions = {
            class: 'file-pond',
            maxFiles: 25,
            multiple: true,
            labelIdle: 'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
            server: {
                process: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].api + "/file/upload",
                revert: {
                    url: _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].api + "/file",
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
    }
    UploadComponent.prototype.ngOnInit = function () {
    };
    UploadComponent.prototype.ngOnDestroy = function () {
        this.filePond.destroy();
    };
    UploadComponent.prototype.emitUpload = function (event) {
        this.upload.emit();
    };
    UploadComponent.prototype.removeAll = function () {
        this.filePond.removeFiles();
    };
    UploadComponent.prototype.processAll = function () {
        var files = this.filePond.getFiles();
        for (var i = 0; i < files.length; i++) {
            if (files[i].status !== this.FileStatus.PROCESSING &&
                files[i].status !== this.FileStatus.PROCESSING_COMPLETE &&
                files[i].status !== this.FileStatus.PROCESSING_PAUSED) {
                this.filePond.processFile(files[i].id);
            }
        }
    };
    UploadComponent.prototype.pondHandleAddFile = function (event) {
        var file = event.file;
        if (file) {
            file.setMetadata('name', file.filename);
            file.setMetadata('lastModified', file.file.lastModified);
            file.setMetadata('size', file.fileSize);
            file.setMetadata('type', file.fileType);
            file.setMetadata('extension', file.fileExtension);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filePond'),
        __metadata("design:type", Object)
    ], UploadComponent.prototype, "filePond", void 0);
    UploadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-upload',
            template: __webpack_require__(/*! ./upload.component.html */ "./src/app/upload/upload.component.html"),
            styles: [__webpack_require__(/*! ./upload.component.scss */ "./src/app/upload/upload.component.scss")]
        })
    ], UploadComponent);
    return UploadComponent;
}());



/***/ }),

/***/ "./src/environments/environment.prod.ts":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: true,
    server: 'http://40.115.124.214:9000/',
    api: 'http://40.115.124.214:9000/api'
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    server: 'http://40.115.124.214:9000/',
    api: 'http://40.115.124.214:9000/api'
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Tal\Katsefet\seal\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map