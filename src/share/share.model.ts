import * as mongoose from 'mongoose';
import IShare from './share.interface';

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface IShareModel extends mongoose.Document, IShare {} // What to do with id?

export const ShareSchema = new mongoose.Schema(
  {
      file: {
        type: ObjectId,
        required: true,
      },
      from: {
        type: ObjectId,
        required: true,
      },
      to: {
        type: ObjectId,
        required: true,
      },
      permissions: {
        read: {
          type: Boolean,
          default: false,
        },
        edit: {
          type: Boolean,
          default: false,
        },
      },
      updatedAt: Date,
  },
  {
    timestamps: true,
    id: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

export default mongoose.model<IShareModel>('Share', ShareSchema);
