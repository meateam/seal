import { ServerError } from '../errors/application';
import { Schema, model, Mongoose } from 'mongoose';
import { IFolder } from './folder.interface';

export const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    files: {
      type: [String],
      required: true,
    },
    folders: {
      type: [String],
      required: true,
    },
  }
);

folderSchema.post('save', (error, doc, next) => {
  next(new ServerError(error.message));
});

export const folderModel = model<IFolder>('folder', folderSchema);
