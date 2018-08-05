import { ServerError } from '../errors/application';
import { model, Model, Schema, Document } from 'mongoose';
import { IUser } from './user.interface';

export interface IUserModel extends Document, IUser {}

export const UserSchema: Schema = new Schema(
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

export const UserModel: Model<IUser> = model<IUserModel>('User', UserSchema);
