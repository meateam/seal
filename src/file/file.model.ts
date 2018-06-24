import * as mongoose from 'mongoose';
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
    updatedAt: Date,
  },
  {
    timestamps: true,
  });

export let fileModel = mongoose.model<IFile>('File', fileSchema);
