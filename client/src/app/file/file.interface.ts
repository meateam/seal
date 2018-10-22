export interface IFile {
    _id: string;
    fileName: string;
    fileSize: number;
    path: string;
    fileType: string;
    createdAt?: Date;
    updatedAt?: Date;
    Owner: string;
    Parent: string;
}
