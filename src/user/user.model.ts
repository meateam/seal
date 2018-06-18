import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

export const userSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true,
  },
  uniqueID:{
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  creationDate:{
    type: Date,
    required: true,
  },
  heirarchy:{
    type: String,
    required: true,
  },
  rootFolder:{
    type: String,
    required: true,
  },
});

export const userModel = mongoose.model<IUser>('User', userSchema);
