# Welcome to Seal project! 
[![Build Status](http://jenkins-ci.centralus.cloudapp.azure.com/buildStatus/icon?job=meateam/seal/devops)](http://jenkins-ci.centralus.cloudapp.azure.com/job/meateam/job/seal/job/devops/)

<img src="http://getdrawings.com/image/cute-seal-drawing-52.png" width="350" height="200" />

#### The project supports both Windows_10 and Ubuntu_16.04, However is mainly designed to work on Ubuntu_16.04.
### To run the tests:
> npm test
### To get statistics on the test coverage of the project, run:
> nyc npm test

## Exported APIs

### File
|  Type    |       Path              |                                   Description                                   |
| :------- | :---------------------- | :------------------------------------------------------------------------------ |
| GET      | `/api/file/:id`         | Get file metadata                                                               |
| GET      | `/api/file`             | Get all of the files in the collection                                          |
| POST     | `/api/file`             | upload a new file                                                               |
| DELETE   | `/api/file/:id`         | delete a file by id                                                             |
| PUT      | `/api/file/:id`         | update a file metadata by its id.                                               |

### User
|  Type    |       Path              |                                   Description                                   |
| :------- | :---------------------- | :------------------------------------------------------------------------------ |
| GET      | `/api/user/:id`         | Get user metadata                                                               |
| GET      | `/api/user`             | Get all of the users in the collection                                          |
| POST     | `/api/user`             | upload a new user                                                               |
| DELETE   | `/api/user/:id`         | delete a user by id                                                             |
| PUT      | `/api/file/:id`         | update a user metadata by its id.                                               |

### Folder
|  Type    |       Path              |                                   Description                                   |
| :------- | :---------------------- | :------------------------------------------------------------------------------ |
| GET      | `/api/folder/:id`       | Get folder metadata                                                             |
| GET      | `/api/folder`           | Get all of the folders in the collection                                        |
| POST     | `/api/folder`           | upload a new folder                                                             |
| DELETE   | `/api/folder/:id`       | delete a folder by id                                                           |
| PUT      | `/api/file/:id`         | update a folder metadata by its id.                                             |



