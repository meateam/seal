import * as mongoose from 'mongoose';
import { IUser } from './user.interface';

export const userSchema = new mongoose.Schema({
  ID:{
    // TODO: create a new type?
    type: String,
    required: true,
  },
  uniqueID:{
    // TODO: create a new type?
    type: String,
    required: true,
  },
  name:{
    // TODO: create a new type?
    type: String,
    required: true,
  },
  creationDate:{
    // TODO: create a new type?
    type: Date,
    required: true,
  },
  heirarchy:{
    // TODO: create a new type?
    type: String,
    required: true,
  },
  rootFolder:{
    // TODO: create a new type?
    type: String,
    required: true,
  },
});

export const userModel = mongoose.model<IUser>('Users', userSchema);
