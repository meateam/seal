import { ServerError } from '../errors/application';
import { model, Model, Schema } from 'mongoose';
import { IUser } from './user.interface';

export const userSchema: Schema = new Schema(
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
    creationDate: {
      type: Date,
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

userSchema.post('save', (error, doc, next) => {
  console.log(error);
  next(new ServerError(error.message));
});

export const userModel: Model<IUser> = model<IUser>('User', userSchema);
