import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.interface';

export const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    uniqueID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    hierarchy: {
      type: String,
      required: true,
    },
    rootFolder: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

export const userModel = model<IUser>('User', userSchema);
