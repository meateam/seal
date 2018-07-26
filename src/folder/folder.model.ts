import { ServerError } from '../errors/application';
import * as mongoose from 'mongoose';
import { IFolder } from './folder.interface';

const ObjectId = mongoose.Schema.Types.ObjectId;
export interface IFolderModel extends Document, IFolder {}

export const FolderSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: ObjectId,
      required: true,
    },
    files: {
      type: [ObjectId],
      required: true,
    },
    folders: {
      type: [ObjectId],
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

FolderSchema.post('save', (error, doc, next) => {
  next(new ServerError(error.message));
});

export const FolderModel = mongoose.model<IFolder>('folder', FolderSchema);
