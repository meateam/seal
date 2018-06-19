export type IUser = {
  id: string;
  uniqueID: string;
  name: string;
  creationDate: number;
  lastUpdated: number;
};

export type IFile = {
  id: string;
  fileName: string;
  fileSize: number;
  path: string;
  fileType: string;
  creationDate: number;
  lastUpdated: number;
  Owner: IUser;
};

export type Permission = {
  read: boolean;
  edit: boolean;
};
