import { ServerError } from '../errors/application';
import { model, Model, Schema } from 'mongoose';
import { IUser } from './user.interface';

export const UserSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
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

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);
