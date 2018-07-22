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

// folderSchema.virtual('files', {
//   ref: 'file', // The model to use
//   localField: '_id', // Find files where `localField`
//   foreignField: 'folderId', // is equal to `foreignField`
//   // If `justOne` is true, 'members' will be a single doc as opposed to
//   // an array. `justOne` is false by default.
//   justOne: false
// });

folderSchema.post('save', (error, doc, next) => {
  next(new ServerError(error.message));
});

export const folderModel = model<IFolder>('folder', folderSchema);
