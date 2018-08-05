import { ServerError } from '../errors/application';
import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

export interface IUserModel extends mongoose.Document, IUser {}

export const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    uniqueID: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hierarchy: {
      type: String,
      required: true
    },
    rootFolder: {
      type: String,
      required: true
    }
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

UserSchema.post('save', (error, doc, next) => {
  next(new ServerError(error.message));
});

export const UserModel: mongoose.Model<IUser> = mongoose.model<IUserModel>('User', UserSchema);
