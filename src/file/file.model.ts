import * as mongoose from 'mongoose';
import { ServerError } from '../errors/application';
import { IFile } from './file.interface';

const fileSchema: mongoose.Schema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    Owner: {
      type: String,
      required: true,
    },
    Parent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  });

fileSchema.post('save', (error, doc, next) => {
  next(new ServerError(error.message));
});

export let fileModel = mongoose.model<IFile>('File', fileSchema);
